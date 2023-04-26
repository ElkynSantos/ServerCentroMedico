import bcrypt, { hash } from "bcrypt";

const encrypt = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const comparePassword = async (password, hashpassword) => {
  return await bcrypt.compare(password, hashpassword);
};

export { encrypt, comparePassword };
