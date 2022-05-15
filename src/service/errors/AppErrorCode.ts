export class AppErrorCode {
  code: string;
  message: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }

  // Service exceptions.

  /** Validation error */
  static SER01 = new AppErrorCode("SER01", "Validation error");
  /** Entity not found error */
  static SER02 = new AppErrorCode("SER02", "Entity not found error");
  /** Authentication error */
  static SER03 = new AppErrorCode("SER03", "Authentication error");
  /** Entity already exists */
  static SER04 = new AppErrorCode("SER04", "Entity already exists");

  // System exceptions.

  /** Internal server error */
  static SYS01 = new AppErrorCode("SYS01", "Internal server error");
  /** Database error */
  static SYS02 = new AppErrorCode("SYS02", "Database error");
}
