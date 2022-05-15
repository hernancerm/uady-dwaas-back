import { User } from "../../data/entities/User";
import { createLogger } from "../../monitor/logger";
import { UserService } from "../../service/services/UserService";
import { AppError } from "../../service/errors/AppError";
import { AppErrorCode } from "../../service/errors/AppErrorCode";

import { Request, Response } from "express";
import { UserRole } from "../../data/entities/UserRole";

const LOGGER = createLogger(__filename);

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getAll = async (_: Request, res: Response): Promise<Response> => {
    LOGGER.debug("Function call: getAll");

    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (e: any) {
      LOGGER.error(e.stack);
      if (e instanceof AppError) {
        switch (e.code) {
          case AppErrorCode.SYS02.code:
            return res.status(500).json(e.getSummary());
        }
      }
      return res.status(500).json(new AppError(AppErrorCode.SYS01));
    }
  };

  createUser = async (req: Request, res: Response): Promise<Response> => {
    LOGGER.debug("Function call: createUser");

    const providedUser: User = Object.assign(new User(), req.body);
    providedUser.role = Object.assign(new UserRole(), req.body.role);

    try {
      const createdUser: User = await this.userService.createUser(providedUser);
      return res.status(201).json(createdUser);
    } catch (e: any) {
      LOGGER.error(e.stack);
      if (e instanceof AppError) {
        switch (e.code) {
          case AppErrorCode.SER01.code:
            return res.status(400).json(e.getSummary());
          case AppErrorCode.SYS02.code:
            return res.status(500).json(e.getSummary());
        }
      }
      return res.status(500).json(new AppError(AppErrorCode.SYS01));
    }
  };

  deleteUserById = async (req: Request, res: Response) => {
    LOGGER.debug("Function call: deleteUserById with id = " + req.params.id);
    try {
      const deletedItem = await this.userService.deleteUser(
        Number(req.params.id)
      );
      return res.status(200).json(deletedItem);
    } catch (e: any) {
      LOGGER.error(e.stack);
      if (e instanceof AppError) {
        switch (e.code) {
          case AppErrorCode.SYS02.code:
            return res.status(500).json(e.getSummary());
        }
      }
      return res.status(500).json(new AppError(AppErrorCode.SYS01));
    }
  }
}
