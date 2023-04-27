import AppError from "../utilities/App.error.js";
import db from "../../DB.js";
import jwt from "jsonwebtoken";
import { comparePassword, encrypt } from "../utilities/bcrypt.js";
//import { generateToken } from "../utilities/random.user.js";

const signToken = (id, rol, name) => {
  return jwt.sign({ id, rol, name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const login = async (req, res, next) => {
  try {
    const { user, Password } = req.body;
    if (!user || !Password) {
      return next(
        new AppError(`El usuario o la contraseña no pueden ir vacíos`, 400)
      );
    }

    const [userExists] = await db.query(
      "CALL user_authentication(:usernombre)",
      {
        replacements: {
          usernombre: user,
        },
      }
    );

    if (userExists.response === 0) {
      return next(new AppError(userExists.msg, 404));
    }

    if (userExists.status !== 1) {
      return next(new AppError("Error Inesperado", 401));
    }

    const rightPassword = await comparePassword(Password, userExists.password);

    if (!rightPassword) {
      return next(new AppError(`Usuario o contraseña invalidos`, 401));
    }
    const jwtToken = signToken(userExists.id, userExists.rol, userExists.name);

    res.status(200).json({
      status: "Ok",
      jwtToken,
      msg: `¡Bienvenido al sistema, ${userExists.name}!`,
    });
  } catch (error) {
    return next(new AppError(`Error en la base de datos ${error}`, 500));
  }
};

export { login };
