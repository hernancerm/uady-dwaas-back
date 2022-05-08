import { Router } from "express";

export interface RouterFactory {
  make: () => Router;
}
