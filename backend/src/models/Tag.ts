import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Ad } from "./Ad";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads: Ad[];
}
