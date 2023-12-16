import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  TGurdian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface';

// 2. Create a Schema corresponding to the document interface.

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, 'First name cannot exceed 50 characters'],
    trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     // Capitalize the first letter and check if it remains the same
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalized format',
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const GurdianSchema = new Schema<TGurdian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
  },
});
const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
  },
});

// const studentSchema = new Schema<Student>({ // for built in method
// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({ // custom interface method
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    //custom static method

    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'USER Id is required'],
      unique: true,
      ref: 'User',
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    name: { type: UserNameSchema, required: [true, 'Name is required'] },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: 'Invalid gender. Please provide a valid gender.',
      },
      required: [true, 'Gender is required'],
    },

    dateofBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergenyContractNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: 'Invalid blood group. Please provide a valid blood group.',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },

    guardian: {
      type: GurdianSchema,
      required: [true, 'Guardian details are required'],
    },
    localguardin: {
      type: LocalGuardianSchema,
      required: [true, 'Local guardian details are required'],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    profileImg: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true } },
);

//virtual
studentSchema.virtual('FullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//query find middleware
studentSchema.pre('find', function (next) {
  // console.log('post hook: we save our data', this);
  this.find({ isDeleted: { $ne: true } });

  next();
});

//findOne
studentSchema.pre('findOne', function (next) {
  // console.log('post hook: we save our data', this);
  this.find({ isDeleted: { $ne: true } });

  next();
});

//aggregate
studentSchema.pre('aggregate', function (next) {
  // console.log('post hook: we save our data', this);
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

// create cusitom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// 3. Create a Model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
