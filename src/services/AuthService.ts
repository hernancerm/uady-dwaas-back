import { JWT_CONFIG } from "../config/JWT_CONFIG";
import { User } from "../entities/User";

import jwt from "jsonwebtoken";

export class AuthService {
  createJwtToken = (user: User): string => {
    return jwt.sign(
      { user: { name: user.name, role: user.userRole } },
      JWT_CONFIG.secret
    );
  };
}
