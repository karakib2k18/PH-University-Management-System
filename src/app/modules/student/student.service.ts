import { Student } from './student.model';

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
  getAllStudentsFromBD,
  getSignleStudentsFromBD,
  deleteStudentsFromBD,
};