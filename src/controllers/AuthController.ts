import { User } from "../entities/User";
import { createLogger } from "../loggers/logger";
import { AuthService } from "../services/AuthService";

import { Request, Response } from "express";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";

const LOGGER = createLogger(__filename);

export class AuthController {
  private authService: AuthService;
  private userRepository: Repository<User>;

  constructor(authService: AuthService, userRepository: Repository<User>) {
    this.authService = authService;
    this.userRepository = userRepository;
  }

  createJwtToken = async (req: Request, res: Response): Promise<Response> => {
    LOGGER.debug("Function call: createJwtToken");

    const providedUser: User = Object.assign(new User(), req.body);

    try {
      const storedUser = await this.userRepository.findOne({
        where: { name: providedUser.name },
      });

      if (!storedUser) {
        LOGGER.warn("Invalid username or password");
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const isPasswordCorrect = bcrypt.compareSync(
        providedUser.password,
        storedUser.password
      );

      if (!isPasswordCorrect) {
        LOGGER.warn("Invalid username or password");
        return res.status(401).json({ error: "Invalid username or password" });
      }

      return res
        .status(200)
        .json({ token: this.authService.createJwtToken(storedUser) });
    } catch (error: any) {
      LOGGER.error(`Message: ${error.message} - Stack trace: ${error.stack}`);
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };
}
