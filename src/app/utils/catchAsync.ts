import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (asyncFn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
