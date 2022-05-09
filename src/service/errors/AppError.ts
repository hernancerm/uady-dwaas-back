import { AppErrorCode } from "./AppErrorCode";

export class AppError {
  code: string;
  message: string;
  stack?: string;
  payload?: any;

  constructor(errorCode: AppErrorCode, payload?: any) {
    this.code = errorCode.code;
    this.message = errorCode.message;
    this.payload = payload;
    this.stack = new Error().stack;
  }

  getSummary() {
    const exceptionSummary = Object.assign({}, this);
    delete exceptionSummary.stack;

    return exceptionSummary;
  }
}
