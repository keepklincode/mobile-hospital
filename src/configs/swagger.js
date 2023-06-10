const swaggerJsDoc = require("swagger-jsdoc");

const { port } = require("./env");

const swagger = {
  swaggerDefinition: {
    info: {
      version: "2.0.0",
      title: "Mobile Hospital",
      contact: { name: "Edi Christian" },
      servers: [{ url: `http://localhost:${port}` }],
    },
  },
  apis: ["./src/swaggerDocs/**/*.yml"],
};

module.exports = swaggerJsDoc(swagger);
