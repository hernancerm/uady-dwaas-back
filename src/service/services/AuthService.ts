import { JWT_CONFIG } from "../../config/JWT_CONFIG";
import { User } from "../../data/entities/User";

import jwt from "jsonwebtoken";

export class AuthService {
  createJwtToken = (user: User): string => {
    return jwt.sign(
      { user: { name: user.name, role: user.role.name } },
      JWT_CONFIG.secret
    );
  };
}
