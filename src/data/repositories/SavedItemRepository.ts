import { SavedItem } from "../entities/SavedItem";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(SavedItem)
export class SavedItemRepository extends Repository<SavedItem> {}
