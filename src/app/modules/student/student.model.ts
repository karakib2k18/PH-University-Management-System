import { Schema, model } from 'mongoose';
import { Gurdian, LocalGuardian, Student, UserName } from './student.interface';

// 2. Create a Schema corresponding to the document interface.

const UserNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const GurdianSchema = new Schema<Gurdian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});
const LocalGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: UserNameSchema,
  gender: ['male', 'female'],
  dateofBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergenyContractNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },

  permanentAddress: { type: String, required: true },

  guardian: GurdianSchema,
  localguardin: LocalGuardianSchema,

  profileImg: { type: String },
  isActive: ['active', 'inactive'],
});

// 3. Create a Model.
export const studentModel = model<Student>('Student', studentSchema);
