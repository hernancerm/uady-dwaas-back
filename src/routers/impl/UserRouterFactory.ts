import { UserRepository } from "../../repositories/UserRepository";
import { UserController } from "../../controllers/UserController";
import { RouterFactory } from "../RouterFactory";

import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { UserService } from "../../services/UserService";

export class UserRouterFactory implements RouterFactory {
  private userController: UserController;

  constructor() {
    this.userController = new UserController(
      new UserService(),
      getCustomRepository(UserRepository)
    );
  }

  make() {
    const router = Router();

    router.route("/").get(this.userController.getAll);

    return router;
  }
}
