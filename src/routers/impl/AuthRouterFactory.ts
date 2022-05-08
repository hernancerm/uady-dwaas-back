import { AuthController } from "../../controllers/AuthController";
import { UserRepository } from "../../repositories/UserRepository";
import { RouterFactory } from "../RouterFactory";
import { UserController } from "../../controllers/UserController";
import { AuthService } from "../../services/AuthService";
import { UserService } from "../../services/UserService";

import { Router } from "express";
import { getCustomRepository } from "typeorm";

export class AuthRouterFactory implements RouterFactory {
  private authController: AuthController;
  private userController: UserController;

  constructor() {
    this.authController = new AuthController(
      new AuthService(),
      getCustomRepository(UserRepository)
    );
    this.userController = new UserController(
      new UserService(),
      getCustomRepository(UserRepository)
    );
  }

  make() {
    const router = Router();

    router.route("/signup").post(this.userController.createUser);
    router.route("/login").post(this.authController.createJwtToken);

    return router;
  }
}
