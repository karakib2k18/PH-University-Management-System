import { NextFunction, RequestHandler, Request, Response } from 'express';

import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const catchAsync = (asyncFn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFn(req, res, next)).catch((err) => next(err));
  };
};

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'createStudent is created successgully',
    data: result,
  });
});

export const userControllers = { createStudent };
