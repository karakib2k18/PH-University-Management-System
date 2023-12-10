/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API NOT FOUNDS !!',
    error: '',
  });
};
