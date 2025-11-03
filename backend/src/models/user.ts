import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export type IUser = {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  totalVisitCount: number;
  passwordResetToken: string | null;
  refreshToken: string | null;
};

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ['user', 'admin'],
        message: '`{VALUE}` is not supported',
      },
    },
    totalVisitCount: {
      type: Number,
      default: 0,
    },
    passwordResetToken: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = model<IUser>('User', userSchema);

export default User;
