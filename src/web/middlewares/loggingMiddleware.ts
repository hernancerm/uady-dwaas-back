import { createLogger } from "../../monitor/logger";

import { Request, Response } from "express";

const LOGGER = createLogger(__filename);

const fieldsToObfuscate = {
  password: undefined,
  authorization: undefined,
};

const obfuscate = (sensitiveObject: object): object => {
  const output = Object.assign({}, sensitiveObject);
  return Object.assign(output, fieldsToObfuscate);
};

export const loggingMiddleware = (req: Request, _: Response, next: any) => {
  LOGGER.info(
    `Http request: ${req.method} ${req.originalUrl} - params: ${JSON.stringify(
      req.params
    )} - headers: ${JSON.stringify(
      obfuscate(req.headers)
    )} - body ${JSON.stringify(obfuscate(req.body))}`
  );

  next();
};
