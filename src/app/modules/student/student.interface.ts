// import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// 1. Create an interface representing a document in MongoDB.
export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateofBirth: string;
  email: string;
  avatar?: string;
  contactNo: string;
  emergenyContractNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Gurdian;
  localguardin: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'inactive';
};
