import { errorLoggerHandling } from './errorLoggerHandling.js';
import { Request, Response } from 'express';

class ErrorApi extends Error {
  constructor(message: string, req : Request, res : Response, statusCode : number = 500) {
    super(message);
    res.status(statusCode).json({ "message": message});

    //~ Log errors
    errorLoggerHandling(message, req);
  }
}

export { ErrorApi };