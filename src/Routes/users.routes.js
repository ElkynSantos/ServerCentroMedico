import express from "express";

import { createUser, allusers, updateUser } from "../controllers/users.js";

const userRouter = express.Router();

userRouter.route("/").post(createUser).get(allusers);
userRouter.route("/update").patch(updateUser);

export default userRouter;
