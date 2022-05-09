import { AuthController } from "../../controllers/AuthController";
import { UserRepository } from "../../../data/repositories/UserRepository";
import { RouterFactory } from "../RouterFactory";
import { UserController } from "../../controllers/UserController";
import { AuthService } from "../../../service/services/AuthService";
import { UserService } from "../../../service/services/UserService";

import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { UserRoleRepository } from "../../../data/repositories/UserRoleRepository";

export class AuthRouterFactory implements RouterFactory {
  private authController: AuthController;
  private userController: UserController;

  constructor() {
    const authService = new AuthService();
    const userService = new UserService(
      getCustomRepository(UserRepository),
      getCustomRepository(UserRoleRepository)
    );

    this.authController = new AuthController(authService, userService);
    this.userController = new UserController(userService);
  }

  make() {
    const router = Router();

    router.route("/signup").post(this.userController.createUser);
    router.route("/login").post(this.authController.createJwtToken);

    return router;
  }
}
