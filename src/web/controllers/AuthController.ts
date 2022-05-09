import { User } from "../../data/entities/User";
import { createLogger } from "../../monitor/logger";
import { AuthService } from "../../service/services/AuthService";

import { Request, Response } from "express";
import { UserService } from "../../service/services/UserService";
import { AppErrorCode } from "../../service/errors/AppErrorCode";
import { AppError } from "../../service/errors/AppError";

const LOGGER = createLogger(__filename);

export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor(authService: AuthService, userService: UserService) {
    this.authService = authService;
    this.userService = userService;
  }

  createJwtToken = async (req: Request, res: Response): Promise<Response> => {
    LOGGER.debug("Function call: createJwtToken");

    const providedUser: User = Object.assign(new User(), req.body);

    try {
      const storedUser = await this.userService.getUserByCredentials(
        providedUser.name,
        providedUser.password
      );

      return res
        .status(200)
        .json({ token: this.authService.createJwtToken(storedUser) });
    } catch (e: any) {
      LOGGER.error(e.stack);
      if (e instanceof AppError) {
        switch (e.code) {
          case AppErrorCode.SER03.code:
            return res.status(401).json(e.getSummary());
          case AppErrorCode.SYS02.code:
            return res.status(500).json(e.getSummary());
        }
      }
      return res.status(500).json(new AppError(AppErrorCode.SYS01));
    }
  };
}
