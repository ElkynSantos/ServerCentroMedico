import AppError from "../utilities/App.error.js";
import db from "../../DB.js";

import { encrypt } from "../utilities/bcrypt.js";
import { generateToken } from "../utilities/random.user.js";
const createUser = async (req, res, next) => {
  try {
    const {
      username,
      name,
      email,
      password,
      gender,
      lastname,
      IDcedula,
      idRoles,
    } = req.body;

    const emptyParams = Object.values({
      username,
      name,
      email,
      password,
      gender,
      lastname,
      IDcedula,
      idRoles,
    }).some((val) => !val);

    if (emptyParams) {
      return next(new AppError(`Por favor complete todos los campos`, 401));
    }

    //TODO: Función para encriptación de passwords
    const hashedPass = await encrypt(password);

    //TODO: Función para crear random tokens
    const token = generateToken();
    const [newUser] = await db.query(
      "CALL create_doc(:p_username, :p_name, :p_email, :p_password, :p_gender, :p_lastname, :p_token, :p_IDcedula, :p_idRoles)",
      {
        replacements: {
          p_username: username,
          p_name: name,
          p_email: email,
          p_password: hashedPass,
          p_gender: gender,
          p_lastname: lastname,
          p_token: token,
          p_IDcedula: IDcedula,
          p_idRoles: idRoles,
        },
      }
    );

    if (newUser.response === 0) {
      return next(new AppError(newUser.msg, 400));
    }

    return res.status(201).json({
      status: "Ok",
      msg: "Se ha creado el nuevo usuario exitosamente",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(`Ha ocurrido un error en el servidor`, 500));
  }
};

const allusers = async (req, res, next) => {
  try {
    const allusers = await db.query("CALL alluser()");

    return res.status(200).json({
      status: "Ok",
      allusers,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(`Ups! Error en la base de datos`, 500));
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { username, name, email, gender, lastname, IDcedula, idRoles } =
      req.body;

    const emptyParams = Object.values({
      username,
      name,
      email,
      gender,
      lastname,
      IDcedula,
      idRoles,
    }).some((val) => !val);

    if (emptyParams) {
      return next(new AppError(`Por favor complete todos los campos`, 401));
    }

    const [updateUser] = await db.query(
      "CALL updateUser(:p_username, :p_name, :p_email, :p_gender, :p_lastname,:p_IDcedula, :p_idRoles)",
      {
        replacements: {
          p_username: username,
          p_name: name,
          p_email: email,
          p_gender: gender,
          p_lastname: lastname,
          p_IDcedula: IDcedula,
          p_idRoles: idRoles,
        },
      }
    );

    if (updateUser.response === 0) {
      return next(new AppError(updateUser.msg, 401));
    }

    return res.status(200).json({
      status: "Ok",
      msg: updateUser.msg,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(`Error en la base de datos ${error}`, 500));
  }
};

export { createUser, allusers, updateUser };
