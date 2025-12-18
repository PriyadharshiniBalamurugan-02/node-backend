const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");   // ✅ REQUIRED

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "Auth + Product CRUD APIs"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  // ✅ ABSOLUTE PATH – WORKS IN VERCEL
  apis: [path.join(process.cwd(), "src/routes/*.js")]
};

module.exports = swaggerJsdoc(options);
