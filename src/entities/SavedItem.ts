import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SavedItemType } from "./SavedItemType";
import { User } from "./User";

@Entity()
export class SavedItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  third_party_url: string;

  @Column()
  user_rating: number;

  @ManyToOne(() => User, (user: User) => user.savedItems)
  user: User;

  @ManyToOne(() => SavedItemType)
  savedItemType: SavedItemType;
}
