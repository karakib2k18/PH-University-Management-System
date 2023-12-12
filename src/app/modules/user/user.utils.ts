import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

//findlast student ID
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  // eslint-disable-next-line no-undefined
  return lastStudent?.id.substring(6) ?? undefined; // Assuming id is a property of lastStudent
};

//generate student ID
export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentId = (await findLastStudentId()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
