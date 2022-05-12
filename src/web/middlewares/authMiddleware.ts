import { JWT_CONFIG } from "../../config/JWT_CONFIG";

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const isRequestForbidden = (authHeader: string): boolean => {
  const authPatternMatches = authHeader.match(/^Bearer .+$/);
  return !authPatternMatches || authPatternMatches.length === 0;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || isRequestForbidden(authHeader)) {
    return res.sendStatus(403);
  }

  jwt.verify(authHeader.split(" ")[1], JWT_CONFIG.secret, (error, decoded) => {
    if (error) {
      return res.sendStatus(401);
    }
    res.locals.user = decoded;
    next();
  });
};
