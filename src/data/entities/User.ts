import { IsNotEmpty, ValidateNested } from "class-validator";
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
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => UserRole)
  @ValidateNested()
  role: UserRole;

  @OneToMany(() => SavedItem, (savedItem: SavedItem) => savedItem.user)
  savedItems: SavedItem[];
}
