import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';
// import studentValidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //------------------------------
    // //==> data validation using zod=> IMPORTANT
    const zodvalidatedData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodvalidatedData);

    //-------------------------------

    // -----------------------------------------
    /*
    const { error, value } = studentValidationSchema.validate(studentData);
    //==> data validation using Joi=> IMPORTANT
    //will call service funditon to send this data
    const result = await StudentServices.createStudentIntoDB(value);
    // console.log({ error }, { value });

    if (error) {
      res.status(500).json({
        success: false,
        message: 'joi validation went wrong',
        data: error.details,
      });
    }
    // ------------------------------
    */

    //send response
    res.status(200).json({
      success: true,
      message: 'createStudent is created successgully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'createStudent is failed',
      data: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromBD();

    //send response
    res.status(200).json({
      success: true,
      message: 'getAllStudents is are retrived successgully',
      data: result,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: 'getAllStudents is failed',
      data: error,
    });
  }
};

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.getSignleStudentsFromBD(studentID);

    //send response
    res.status(200).json({
      success: true,
      message: 'getSingleStudents is are retrived successgully',
      data: result,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: 'getSingleStudents is failed',
      data: error,
    });
  }
};
const deleteStudents = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.deleteStudentsFromBD(studentID);

    //send response
    res.status(200).json({
      success: true,
      message: 'getSingleStudents is DELETED successgully',
      data: result,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: 'getSingleStudents is failed',
      data: error,
    });
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudents,
};
