import { Repository } from "typeorm";
import { Request, Response } from "express";

type TDefaultResponse<V> = (
  req: Request,
  res: Response
) => Promise<Response<V>>;

type TController<T> = (repository: Repository<T>) => {
  getAll: TDefaultResponse<T[]>;
  getById: TDefaultResponse<T>;
  create: TDefaultResponse<T>;
  update: TDefaultResponse<T>;
  deleteById: TDefaultResponse<T>;
};
