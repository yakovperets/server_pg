import express, { Request, Response } from "express";
const router = express.Router();
import usersRoutes from "../users/routes/usersRoutes";
import teachersRoutes from "../users/routes/teachersRoutes";

router.use("/api/users", usersRoutes);
router.use("/api/teachers", teachersRoutes);

router.use("*", (req: Request, res: Response) =>
  res.status(404).send("Page not found!")
);

export default router;
