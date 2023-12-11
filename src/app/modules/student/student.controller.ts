import { RequestHandler } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentServices.getAllStudentsFromBD();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'getAllStudents is are retrived successgully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudents: RequestHandler = async (req, res, next) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.getSignleStudentsFromBD(studentID);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'getSingleStudents is are retrived successgully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteStudents: RequestHandler = async (req, res, next) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.deleteStudentsFromBD(studentID);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'getSingleStudents is DELETED successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
};
