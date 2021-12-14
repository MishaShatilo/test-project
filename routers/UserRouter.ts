import { Router } from "express";
import { controller } from "../controllers/UserController";
import { check, cookie } from "express-validator";
const UserRouter = Router()
UserRouter.post('/registration',[
    check('username',"имя пользователя не может быть пустым").notEmpty(),
    check('password', "пароль должен быть от 5 до 10 символов").isLength({min:5, max:10})
], controller.registration);
UserRouter.post('/login',controller.login);
export {UserRouter};
