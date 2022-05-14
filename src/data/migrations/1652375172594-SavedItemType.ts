import { SavedItemTypeRepository } from "./../repositories/SavedItemTypeRepository";
import { SavedItemType } from "./../entities/SavedItemType";
import { MigrationInterface, QueryRunner } from "typeorm";

export class SavedItemType1652375172594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const animeItemType = new SavedItemType();
    animeItemType.name = "anime";

    const mangaItemType = new SavedItemType();
    mangaItemType.name = "manga";

    const savedItemTypeRepository = queryRunner.connection.getCustomRepository(
      SavedItemTypeRepository
    );
    await savedItemTypeRepository.save(animeItemType);
    await savedItemTypeRepository.save(mangaItemType);
  }

  public async down(): Promise<void> {}
}
