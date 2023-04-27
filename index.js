import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import db from "./DB.js";

import userRouter from "./src/Routes/users.routes.js";
import authRouter from "./src/Routes/auth.routes.js";
dotenv.config();

try {
  await db.authenticate();
  console.log("Conexion Correcta a la BD");
} catch (error) {
  console.log("Error en la conexion " + error);
}

const app = express();
app.use(morgan("dev"));
app.use(express.json());
//Routes
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
