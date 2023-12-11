import { AnyZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (Schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //validate
    try {
      await Schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
