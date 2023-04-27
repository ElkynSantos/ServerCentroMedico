import express from "express";

import { login } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.route("/login").post(login);

export default authRouter;
