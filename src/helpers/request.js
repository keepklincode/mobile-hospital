const Bluebird = require("bluebird");
const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");
const jwt = require("jsonwebtoken");

fetch.Promise = Bluebird;

module.exports = async (url, method = "post", req) => {
  try {
    let { body } = req;
    const { files } = req;

    let headers = {
      "x-access-token": jwt.sign({}, process.env.SECRET, { expiresIn: "10s" }),
      ...req.headers,
    };

    const hasFile = Object.keys(files).length !== 0;
    let response;

    if (hasFile) {
      
      delete headers["content-type"];

      const fd = new FormData();

      for (const param in body) {
        fd.append(param, body[param]);
      }
      for (const key in files) {
        const { path } = files[key];

        const { size: knownLength } = fs.statSync(path);
        const fileStream = fs.createReadStream(path);

        fd.append(key, fileStream, { knownLength });
      }

      body = fd;

      response = await fetch(url, {
        method,
        credentials: "include",
        headers,
        body,
      });
    } else {
      headers = { ...headers, "content-type": "application/json" };

      body = method.toLowerCase() === "get" ? null : JSON.stringify(body);

      const { query } = req;

      if (query) {
        url = new URL(url);
        url.search = new URLSearchParams(query).toString();
      }

      response = await fetch(url, { method, body, headers });
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: "Endpoint is not reachable " + e.message,
      timestamp: new Date().toJSON(),
    };
  }
};
