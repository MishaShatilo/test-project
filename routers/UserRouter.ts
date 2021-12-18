import { Router } from "express";
import { controller } from "../controllers/userController";
import { check } from "express-validator";
const chekerPassword = check(
  "password",
  "пароль должен быть от 5 до 10 символов"
).isLength({ min: 5, max: 10 });
const checkLogin = check(
  "username",
  "имя пользователя не может быть пустым"
).notEmpty();
const UserRouter = Router();
UserRouter.post(
  "/registration",
  [chekerPassword, checkLogin],
  controller.registration
);
UserRouter.post("/login", controller.login);
export { UserRouter };
