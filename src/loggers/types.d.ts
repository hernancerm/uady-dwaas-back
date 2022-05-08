import winston from "winston";

type TLoggerCreator = (filename: string) => winston.Logger;
