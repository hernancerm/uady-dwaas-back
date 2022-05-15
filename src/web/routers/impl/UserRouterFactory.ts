import { UserRepository } from "../../../data/repositories/UserRepository";
import { UserController } from "../../controllers/UserController";
import { RouterFactory } from "../RouterFactory";
import { UserService } from "../../../service/services/UserService";
import { getCustomRepository } from "typeorm";
import { UserRoleRepository } from "../../../data/repositories/UserRoleRepository";

import { Router } from "express";

export class UserRouterFactory implements RouterFactory {
  private userController: UserController;

  constructor() {
    const userService = new UserService(
      getCustomRepository(UserRepository),
      getCustomRepository(UserRoleRepository)
    );
    this.userController = new UserController(userService);
  }

  make() {
    const router = Router();

    router.route("/").get(this.userController.getAll);
    router.route("/:id").delete(this.userController.deleteUserById);

    return router;
  }
}
