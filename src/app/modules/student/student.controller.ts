import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //will call service funditon to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    //send response
    res.status(200).json({
      success: true,
      message: 'createStudent is created successgully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: 'hayhay' });
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
    res.status(500).json({ error: 'hayhay' });
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
    res.status(500).json({ error: 'hayhay' });
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
