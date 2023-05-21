// dependencies
import crypto from "crypto";
import jwt from "jsonwebtoken";

// Utils class
class Utils {
  // takes passwords and hashes it (encrypts)
  hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 2048, 32, "sha512")
      .toString("hex");
    return [salt, hash].join("$");
  }

  // checks a password against the original and returns true/false if they verify
  verifyPassword(password: string, original: string) {
    const originalHash = original.split("$")[1];
    const salt = original.split("$")[0];
    const hash = crypto
      .pbkdf2Sync(password, salt, 2048, 32, "sha512")
      .toString("hex");
    return hash === originalHash;
  }

  generateAccessToken(user: any) {
    return jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "30min",
    });
  }
}

const utils = new Utils();

export default utils;
