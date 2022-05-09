import winston from "winston";

type LoggerCreator = (filename: string) => winston.Logger;
