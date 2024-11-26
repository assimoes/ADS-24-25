import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Ad } from "./Ad";
import { User } from "./User";

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wishlist)
  user: User;

  @ManyToOne(() => Ad)
  ad: Ad;
}
