import { DataSource } from "typeorm";
import { join } from "path";
import { Ad } from "./models/Ad";
import { Tag } from "./models/Tag";
import { User } from "./models/User";
import { Wishlist } from "./models/Wishlist";

console.log("Migrations Path:", join(__dirname, "migrations/*.ts"));

export default new DataSource({
  type: "sqlite",
  database: "classified_ads.db",
  synchronize: true,
  logging: true,
  entities: [Ad, Tag, User, Wishlist],
});
