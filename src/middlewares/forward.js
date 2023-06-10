const { request } = require("../helpers");
const { request2 } = require("../helpers");


module.exports = (_url) => {
  return async (req, res) => {
    const url = _url + req.path;


      console.log(url);

      res.send(await request(url, req.method, req));
    }
  };
