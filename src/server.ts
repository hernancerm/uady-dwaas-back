import { createLogger } from "./monitor/logger";
import { authMiddleware } from "./web/middlewares/authMiddleware";
import { AuthRouterFactory } from "./web/routers/impl/AuthRouterFactory";
import { UserRouterFactory } from "./web/routers/impl/UserRouterFactory";
import { loggingMiddleware } from "./web/middlewares/loggingMiddleware";

import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";

const LOGGER = createLogger(__filename);

const port = 8080;
const host = "0.0.0.0";

const app = express();
app.use(express.json());
app.use(cors());

createConnection().then(() => {
  // Middlewares.
  app.use("/api/auth", loggingMiddleware);
  // Within the non-capturing group (?:auth) add any other non-protected routes.
  // For instance, (?:auth) -> (?:auth|foo) to NOT protect /api/auth/** AND /api/foo/**.
  app.use(/\/api(?!\/(?:auth))/, loggingMiddleware, authMiddleware);

  // Routers.
  app.use("/api/auth", new AuthRouterFactory().make());
  app.use("/api/users", new UserRouterFactory().make());
});

app.listen(port, host);

LOGGER.info(`Running on http://${host}:${port}`);
