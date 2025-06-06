import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "klicky_dev_secret";
const EXPIRES_IN = "1d";

type JwtPayload = {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
};

export function signJwt(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
}

export function verifyJwt<T = JwtPayload>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
