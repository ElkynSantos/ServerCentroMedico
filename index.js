import express from "express";
import dotenv from "dotenv";
import db from "./DB.js";

dotenv.config();

try {
  await db.authenticate();
  console.log("Conexion Correcta a la BD");
} catch (error) {
  console.log("Error en la conexion " + error);
}

const app = express();

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
