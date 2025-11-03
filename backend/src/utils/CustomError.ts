import { logger } from '@/lib/winston';
import { NextFunction, Request, Response } from 'express';

export class CustomError extends Error {
  public statusCode: number;
  public timestamp: string;
  public type: string;
  public details?: string | undefined;
  public path?: string | undefined;

  constructor(
    message: string,
    statusCode: number,
    type: string,
    details?: string,
    path?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.type = type;
    this.path = path;
    this.timestamp = new Date().toISOString();

    // This ensures the name of the error matches the class name
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const ErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error common handler', err);
  res.status(err.statusCode ?? 500).json({
    status: 'error',
    message: err.message ?? 'Internal Server Error',
  });
};
