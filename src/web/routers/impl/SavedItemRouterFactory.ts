import { UserRepository } from './../../../data/repositories/UserRepository';
import { SavedItemTypeRepository } from './../../../data/repositories/SavedItemTypeRepository';
import { SavedItemRepository } from '../../../data/repositories/SavedItemRepository';
import { SavedItemController } from '../../controllers/SavedItemController';;
import { RouterFactory } from "../RouterFactory";
import { getCustomRepository } from "typeorm";

import { Router } from "express";
import { SavedItemService } from '../../../service/services/SavedItemService';

export class SavedItemRouterFactory implements RouterFactory {
  private savedItemController: SavedItemController;

  constructor() {
    const savedItemService = new SavedItemService(
      getCustomRepository(SavedItemRepository),
      getCustomRepository(SavedItemTypeRepository),
      getCustomRepository(UserRepository)
    );
    this.savedItemController = new SavedItemController(savedItemService);
  }

  make() {
    const router = Router();

    router.route("/").get(this.savedItemController.getAll);
    router.route("/user/:id").get(this.savedItemController.getAllByUserId);
    router.route("/").post(this.savedItemController.createSavedItem);
    router.route("/:id").delete(this.savedItemController.deleteSavedItem);

    return router;
  }
}
