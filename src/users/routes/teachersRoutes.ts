import express from "express";
import {
  handleGetTeachers,
  handleEditTeacher,
  handleGetTeacher,
  handleNewTeacher,
  handleDeleteUser,
} from "../controllers/teachersController";
const router = express.Router();

router.get("/", handleGetTeachers);
router.get("/:id", handleGetTeacher);
router.post("/", handleNewTeacher);
router.patch("/:id/", handleEditTeacher);
router.delete("/:id", handleDeleteUser);

export default router;
