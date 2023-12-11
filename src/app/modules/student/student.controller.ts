import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromBD();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'getAllStudents is are retrived successgully',
    data: result,
  });
});

const getSingleStudents = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const result = await StudentServices.getSignleStudentsFromBD(studentID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'getSingleStudents is are retrived successgully',
    data: result,
  });
});
const deleteStudents = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const result = await StudentServices.deleteStudentsFromBD(studentID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'getSingleStudents is DELETED successfully',
    data: result,
  });
});

export const studentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
};
