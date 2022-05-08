import { User } from "../entities/User";
import { createLogger } from "../loggers/logger";
import { UserService } from "../services/UserService";

import { Request, Response } from "express";
import { Repository } from "typeorm";

const LOGGER = createLogger(__filename);

export class UserController {
  private userService: UserService;
  private userRepository: Repository<User>;

  constructor(userService: UserService, userRepository: Repository<User>) {
    this.userService = userService;
    this.userRepository = userRepository;
  }

  getAll = async (_: Request, res: Response): Promise<Response> => {
    LOGGER.debug("Function call: getAll");

    const users = await this.userRepository.find();
    return res.status(200).json(users);
  };

  createUser = async (req: Request, res: Response): Promise<Response> => {
    LOGGER.debug("Function call: createUser");

    const providedUser: User = Object.assign(new User(), req.body);

    const assembledUser: User = await this.userService.assembleUserForCreation(
      providedUser
    );

    try {
      const createdUser: User = await this.userRepository.save(assembledUser);
      return res.status(201).json(createdUser);
    } catch (error: any) {
      LOGGER.error(`Message: ${error.message} - Stack trace: ${error.stack}`);
      return res.status(500).json({ error: "Unexpected error" });
    }
  };
}
