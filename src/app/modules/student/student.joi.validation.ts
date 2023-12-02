import Joi from 'joi';
import validator from 'validator';

const UserNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .trim()
    .pattern(/^[A-Z][a-z]*$/)
    .required(),

  middleName: Joi.string().max(20),

  lastName: Joi.string()
    .max(20)
    .custom((value, helpers) => {
      if (!validator.isAlpha(value)) {
        return helpers.message(must only contain alphabetical characters");
      }
      return value;
    })
    .required(),
});

const GurdianValidationSchema = Joi.object({
  fatherName: Joi.string().max(20).required(),
  fatherOccupation: Joi.string().max(20).required(),
  fatherContactNo: Joi.string().max(20).required(),

  motherName: Joi.string().max(20).required(),
  motherOccupation: Joi.string().max(20).required(),
  motherContactNo: Joi.string().max(20).required(),
});

const LocalGuardianValidationSchema = Joi.object({
  name: Joi.string().max(20).required(),
  occupation: Joi.string().max(20).required(),
  contactNo: Joi.string().max(20).required(),
  address: Joi.string().max(20).required(),
});

const studentValidationSchema = Joi.object({
  student: Joi.object({
    id: Joi.string().max(20),
    name: UserNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateofBirth: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().max(20).required(),
    emergenyContractNo: Joi.string().max(20).required(),
    bloodGroup: Joi.string().valid(
      'A+',
      'A-',
      'B+',
      'B-',
      'AB+',
      'AB-',
      'O+',
      'O-',
    ),
    presentAddress: Joi.string().max(20).required(),
    permanentAddress: Joi.string().max(20).required(),
    guardian: GurdianValidationSchema.required(),
    localguardin: LocalGuardianValidationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string()
      .valid('active', 'inactive')
      .default('active')
      .required(),
  }),
});
export default studentValidationSchema;
