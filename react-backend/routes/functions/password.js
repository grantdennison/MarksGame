import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  const hashPwd = await bcrypt.hash(password, 5);
  return hashPwd;
}

export async function matchPassword(hashPwd, password) {
  const match = await bcrypt.compare(password, hashPwd);
  return match;
}
