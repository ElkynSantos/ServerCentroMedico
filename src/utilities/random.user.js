function generateToken() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  const charLength = chars.length;
  const tokenLength = 12;

  for (let i = 0; i < tokenLength; i++) {
    token += chars.charAt(Math.floor(Math.random() * charLength));
  }

  return token;
}

export { generateToken };
