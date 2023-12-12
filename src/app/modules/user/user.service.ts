import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'student';

  //find academic semester info
  const admissionSemesterID = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // //set manually generated id
  if (admissionSemesterID != null) {
    userData.id = await generateStudentId(admissionSemesterID);
  }
  // userData.id = '202310002';
  //create a user
  const newUser = await User.create(userData);

  //crate a student
  if (Object.keys(newUser).length) {
    //set id, _id as a user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    //create a new student
    const newStudent = await Student.create(payload);
    return newStudent;
  }
  //   return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};
