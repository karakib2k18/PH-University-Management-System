import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);

  //set manually generated id
  userData.id = '202310001';

  //set student role
  userData.role = 'student';
  //create a user
  const newUser = await User.create(userData);

  //crate a student
  if (Object.keys(newUser).length) {
    //set id, _id as a user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference _id

    //create a new student
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
  //   return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};
