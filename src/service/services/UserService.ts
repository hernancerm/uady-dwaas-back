import { JWT_CONFIG } from "../../config/JWT_CONFIG";
import { UserRole } from "../../data/entities/UserRole";
import { User } from "../../data/entities/User";
import { AppErrorCode } from "../errors/AppErrorCode";
import { AppError } from "../errors/AppError";

import bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { validate } from "class-validator";

export class UserService {
  private userRepository: Repository<User>;
  private userRoleRepository: Repository<UserRole>;

  constructor(
    userRepository: Repository<User>,
    userRoleRepository: Repository<UserRole>
  ) {
    this.userRepository = userRepository;
    this.userRoleRepository = userRoleRepository;
  }

  getAllUsers = async (): Promise<User[]> => {
    try {
      return await this.userRepository.find();
    } catch (e: any) {
      return Promise.reject(new AppError(AppErrorCode.SYS02));
    }
  };

  getUserByCredentials = async (
    username: string,
    password: string
  ): Promise<User> => {
    try {
      const storedUser: User | undefined = await this.userRepository.findOne({
        where: { name: username },
        relations: ["role"],
      });

      if (!storedUser) {
        return Promise.reject(new AppError(AppErrorCode.SER03));
      }

      const isPasswordCorrect = bcrypt.compareSync(
        password,
        storedUser.password
      );
      if (!isPasswordCorrect) {
        return Promise.reject(new AppError(AppErrorCode.SER03));
      }

      return storedUser;
    } catch (e: any) {
      return Promise.reject(new AppError(AppErrorCode.SYS02, e));
    }
  };

  createUser = async (user: User): Promise<User> => {
    try {
      const errors = await validate(user);
      if (errors.length > 0) {
        return Promise.reject(new AppError(AppErrorCode.SER01, errors));
      }

      const hashedPassword = await bcrypt.hash(
        user.password,
        await bcrypt.genSalt(JWT_CONFIG.salt)
      );

      const storedRole = await this.userRoleRepository.findOne({
        where: { name: user.role.name },
      });

      if (!storedRole) {
        return Promise.reject(new AppError(AppErrorCode.SER02));
      }

      const assembledUser: User = Object.assign(new User(), {
        name: user.name,
        password: hashedPassword,
        email: user.email,
        role: storedRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return await this.userRepository.save(assembledUser);
    } catch (e: any) {
      return Promise.reject(new AppError(AppErrorCode.SYS02, e));
    }
  };
}
