// import studentValidationSchema from './student.validation';
import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// import studentValidationSchema from './student.joi.validation';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    //------------------------------
    // //==> data validation using zod=> IMPORTANT
    // const zodvalidatedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'createStudent is created successgully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = { createStudent };
