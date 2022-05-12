import { SavedItemTypeRepository } from './../repositories/SavedItemTypeRepository';
import { SavedItemType } from './../entities/SavedItemType';
import {getCustomRepository, MigrationInterface} from "typeorm";

export class SavedItemType1652375172594 implements MigrationInterface {

    public async up(): Promise<void> {
      const animeItem = new SavedItemType();
      animeItem.name = "anime";
      const mangaItem = new SavedItemType();
      mangaItem.name = "manga";
      const savedItemTypeRepository = getCustomRepository(SavedItemTypeRepository);
      savedItemTypeRepository.save(animeItem);
      savedItemTypeRepository.save(mangaItem);
    }

    public async down(): Promise<void> {}

}
