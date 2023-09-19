import UserInterface from "../interfaces/UserInterface";
import { v1 as uuid1 } from "uuid";
import { comparePassword, generateUserPassword } from "../helpers/bcrypt";
import {
  getCollectionFromJsonFile,
  modifyCollection,
} from "../../dataAccess/jsonfileDAL";
import chalk from "chalk";
import userValidation from "../models/joi/userValidation";
import { getDataFromDummy } from "../../dataAccess/dummyjson";
import { addDataToJsonPlaceHolder } from "../../dataAccess/jsonPlaceHolder";
import {
  getAllUsersFromMongo,
  addToMongo,
  getUserByIdFromMongo,
  updateUserById,
  deleteUserById,
} from "../../dataAccess/mongodb";

type UserResult = Promise<UserInterface | null>;
export const getUsers = async () => {
  try {
    const users = await getAllUsersFromMongo();
    return users;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await getUserByIdFromMongo(userId);
    return user;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const register = async (user: UserInterface) => {
  try {
    const fidback = await addToMongo(user.email, user.password);
    console.log(fidback);
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const editUser = async (
  userId: string,
  userForUpdate: UserInterface
) => {
  try {
    const updateUser = await updateUserById(userId, userForUpdate);
    return updateUser;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const user = await deleteUserById(userId);
    return user;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const login = async (userFromClient: UserInterface) => {
  try {
    const users = (await getCollectionFromJsonFile(
      "users"
    )) as unknown as UserInterface[];
    if (!users)
      throw new Error("Oops... Could not get the users from the Database");

    const userInDB = users.find((user) => userFromClient.email === user.email);

    if (!userInDB) throw new Error("The email or password is incorrect!");

    const userCopy = { ...userInDB };

    if (!comparePassword(userFromClient.password, userCopy.password))
      throw new Error("The email or password is incorrect!");

    return "You are logged in!";
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const addProductToUser = async (
  userId: string,
  productFromClient: string
) => {
  try {
    const user = await getUser(userId);
    if (!user) throw new Error("Could not find this user!");

    const data = await getDataFromDummy();
    if (!data?.data) throw new Error("Could not get the data!");
    const { data: dataFromDummy } = data;

    const productFromDB = dataFromDummy.products.find(
      (product: Record<string, unknown>) =>
        typeof product.title === "string" &&
        product.title
          .toLowerCase()
          .trim()
          .includes(productFromClient.toLowerCase().trim())
    );

    // if (!productFromDB) throw new Error("Could not found this product");
    // user.product = productFromDB;

    // const userFromJsonPlaceHolder = await addDataToJsonPlaceHolder(
    //   user,
    //   "users"
    // );
    // if (!userFromJsonPlaceHolder)
    //   throw new Error("Could not add this user to jsonplaceholder database");

    // return userFromJsonPlaceHolder;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error)
      console.log(chalk.redBright(error.message));
    return Promise.reject(error);
  }
};
