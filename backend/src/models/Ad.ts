import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Tag } from "./Tag";

@Entity()
export class Ad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("float")
  price: number;

  @ManyToOne(() => User, (user) => user.ads, { eager: true })
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.ads, { cascade: true })
  @JoinTable()
  tags: Tag[];
}
