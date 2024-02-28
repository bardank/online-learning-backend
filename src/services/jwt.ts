import * as jwt from "jsonwebtoken";

export default function getToken(id: string, email: string): string {
  const expiresIn = process.env.JWT_EXPIRES_IN;
  const secret = process.env.JWT_SECRET;

  if (!expiresIn || !secret) {
    throw new Error("JWT secret and expiration time are required");
  }

  const accessToken = jwt.sign(
    {
      id,
      email,
    },
    secret,
    { expiresIn }
  );
  return accessToken;
}
