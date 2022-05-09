import { SavedItemType } from "../entities/SavedItemType";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(SavedItemType)
export class SavedItemTypeRepository extends Repository<SavedItemType> {}
