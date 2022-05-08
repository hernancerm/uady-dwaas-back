import { JWT_CONFIG } from "../config/JWT_CONFIG";
import { User } from "../entities/User";

import bcrypt from "bcrypt";

export class UserService {
  assembleUserForCreation = async (user: User): Promise<User> => {
    const hashedPassword = await bcrypt.hash(
      user.password,
      await bcrypt.genSalt(JWT_CONFIG.salt)
    );

    const userToCreate: User = Object.assign(new User(), {
      name: user.name,
      password: hashedPassword,
      email: user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return userToCreate;
  };
}
