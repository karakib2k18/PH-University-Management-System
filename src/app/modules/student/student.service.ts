import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  //   //built in static method
  // const result = await Student.create(studentData);

  /*
  //static-instance method create
  const student = new Student(studentData); // create an instance
  if (await student.isUserExists(studentData.id)) {
    throw new Error('user already registerd');
  }
  const result = await student.save(); //built in instance method
  return result;
  */

  // 9-7 Implement a custom static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('user already registerd');
  }
  const result = await Student.create(studentData);
  return result;
};

const getAllStudentsFromBD = async () => {
  const result = await Student.find();
  return result;
};

const getSignleStudentsFromBD = async (id: string) => {
  // noramal system
  // const result = await Student.findOne({ id });
  // return result;

  //aggregate system
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentsFromBD = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromBD,
  getSignleStudentsFromBD,
  deleteStudentsFromBD,
};
