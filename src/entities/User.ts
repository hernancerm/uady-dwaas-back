import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SavedItem } from "./SavedItem";
import { UserRole } from "./UserRole";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => UserRole)
  userRole: UserRole;

  @OneToMany(() => SavedItem, (savedItem: SavedItem) => savedItem.user)
  savedItems: SavedItem[];
}
