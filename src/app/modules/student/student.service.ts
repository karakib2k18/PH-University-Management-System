import { Student } from './student.model';

const getAllStudentsFromBD = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate('academicDepartment');
  return result;
};

const getSignleStudentsFromBD = async (id: string) => {
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
