import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userService } from "../services/userService";

const cookieAge = 30 * 24 * 60 * 1000;

class Controller {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "ошибка при регистрации", errors });
      }
      const { username, password } = req.body;
      const userData = await userService.registration(
        { username, password },
        res
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: cookieAge,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await userService.login({ username, password }, res);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: cookieAge,
        httpOnly: true,
      });
      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
}
const controller = new Controller();
export { controller };
