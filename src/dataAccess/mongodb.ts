import mongoose, { Document, Model } from "mongoose";
import { User, UserSchema } from "../users/models/joi/mongooseSchem";
export const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/userApp");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

const UserModel: Model<User> = mongoose.model<User>("user", UserSchema);

export async function main() {
  await connectToDatabase();

  const newUser = new UserModel({
    email: "example@example.com",
    password: "examplePassword",
  });

  try {
    const savedUser = await newUser.save();
    console.log("Saved user:", savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
  }
}

export const getAllUsersFromMongo = async () => {
  try {
    const users = UserModel.find();
    return users;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getUserByIdFromMongo = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId);
    console.log("aaa");
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const addToMongo = async (email: string, password: string) => {
  try {
    const newUser = new UserModel({
      email,
      password,
    });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateUserById = async (
  userId: string,
  updatedData: Partial<User>
) => {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!user) {
      throw new Error("User not found");
    }
    console.log(user);
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const deleteUserById = async (userId: string) => {
  try {
    const deletedUser = await UserModel.findByIdAndRemove(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (error) {
    return Promise.reject(error);
  }
};
