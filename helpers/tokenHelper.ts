import jwt from "jsonwebtoken";
import { env } from "../config";
import { Token } from "../models/token";
class Tokens {
  generateTokens(payload: object) {
    const accessToken = jwt.sign(payload, env.secretAccess, {
      expiresIn: env.expiresInToken,
    });
    const refreshToken = jwt.sign(payload, env.secretRefresh, {
      expiresIn: env.expiresInRefresh,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId: number, refreshToken: string) {
    const tokendata = await Token.findOne({ where: { userId: userId } });
    if (tokendata) {
      tokendata.token = refreshToken;
      return tokendata.save();
    }
    const token = await Token.create({ userId: userId, token: refreshToken });
    return token;
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, env.secretAccess);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

const token = new Tokens();
export { token };
