import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Classified Ads API",
      version: "1.0.0",
      description: "API documentation for the Classified Ads application",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerOptions;
