// import studentValidationSchema from './student.validation';
import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// import studentValidationSchema from './student.joi.validation';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;
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
