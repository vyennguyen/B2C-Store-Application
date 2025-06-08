// lib/jwt.ts
import { SignJWT, jwtVerify } from "jose";

// Your secret must be encoded into a Uint8Array
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "klicky_dev_secret"
);
const EXPIRES_IN = "1d";

export type JwtPayload = {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
};

// Sign JWT using jose
export async function signJwt(payload: JwtPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(JWT_SECRET);
}

// Verify JWT using jose
export async function verifyJwt<T = JwtPayload>(
  token: string
): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as T;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
