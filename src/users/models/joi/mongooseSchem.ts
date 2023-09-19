import { Schema } from "mongoose";
export interface User extends Document {
  email: string;
  password: string;
}
export const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
