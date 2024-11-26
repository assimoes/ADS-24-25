import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ad } from "./Ad";
import { Wishlist } from "./Wishlist";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(() => Ad, (ad) => ad.user)
  ads: Ad[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist[];
}
