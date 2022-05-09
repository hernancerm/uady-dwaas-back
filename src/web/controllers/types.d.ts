import { Repository } from "typeorm";
import { Request, Response } from "express";

type DefaultResponse<V> = (req: Request, res: Response) => Promise<Response<V>>;

type Controller<T> = (repository: Repository<T>) => {
  getAll: DefaultResponse<T[]>;
  getById: DefaultResponse<T>;
  create: DefaultResponse<T>;
  update: DefaultResponse<T>;
  deleteById: DefaultResponse<T>;
};
