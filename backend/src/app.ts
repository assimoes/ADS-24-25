import express from "express";
import cors from 'cors'
import "./data-source";
import adRoutes from "./routes/adRoutes";
import wishlistRoutes from "./routes/wishlistRoutes"
import tagRoutes from "./routes/tagRoutes"
import dataSource from './data-source';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./swagger";
import { User } from './models/User';
import { seedUsers } from './seeds/seedUsers';
import { Tag } from './models/Tag';
import { seedTags } from './seeds/seedTags';

const app = express();
const PORT = 8080;

const swaggerSpec = swaggerJsdoc(swaggerOptions)

dataSource.initialize()
  .then(async () => {
    console.log("Database connected");
    app.use(cors({
      origin: "http://localhost:3000",
    }))

    const userRepository = dataSource.getRepository(User)
    const tagRepository = dataSource.getRepository(Tag)

    await seedUsers(userRepository)
    await seedTags(tagRepository)

    app.use(express.json());
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.use("/api/ads", adRoutes);
    app.use("/api/whishlist", wishlistRoutes)
    app.use("/api/tags", tagRoutes)



    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch((error) => console.error("Database connection error:", error));
