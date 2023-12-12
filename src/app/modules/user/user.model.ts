import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//Encrypt & pre save middleware/hook: will work on create on save function
userSchema.pre('save', async function (next) {
  // console.log('pre hook: we save our data', this);

  //hashing password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // documents
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds),
  );
  next();
});

//set ''after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  // console.log('post hook: we save our data', this);
  next();
});

const User = model<TUser>('User', userSchema);

export default User;
