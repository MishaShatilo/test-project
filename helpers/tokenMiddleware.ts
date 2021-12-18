import { Request, Response } from "express";
import { token } from "./tokenHelper";
export default (req: Request, res: Response, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(400);
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      res.status(400);
    }
    const userData = token.validateAccessToken(accessToken);
    if (!userData) {
      res.status(400).json("Пользователь не авторизован");
    }
    next();
  } catch (error) {}
};
