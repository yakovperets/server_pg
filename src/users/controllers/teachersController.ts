import UserInterface from "../interfaces/UserInterface";
import {
  deleteTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  createTeacher,
  Teacher,
} from "../services/psostgressServices";
import { handleError } from "../../utils/handleErrors";
import userValidation from "../models/joi/userValidation";
import { Request, Response } from "express";

export const handleGetTeachers = async (req: Request, res: Response) => {
  try {
    const users = await getTeachers();
    return res.send(users);
  } catch (error) {
    handleError(res, error);
  }
};
export const handleGetTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numId = Number(id);
    const user = await getTeacherById(numId);
    return res.send(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleNewTeacher = async (req: Request, res: Response) => {
  try {
    const user: Teacher = req.body;
    const userFromDB = await createTeacher(user);
    return res.status(201).send(userFromDB);
  } catch (error) {
    if (error instanceof Error) handleError(res, error);
  }
};

export const handleEditTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { field, value } = req.query;
    const numId = Number(id);
    if (typeof field !== "string" || typeof value !== "string")
      throw new Error("please send valid field");

    const userFromDB = await updateTeacher(numId, field, value);
    return res.send(userFromDB);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numId = Number(id);
    const user = await deleteTeacher(numId);
    return res.send(user);
  } catch (error) {
    handleError(res, error);
  }
};
