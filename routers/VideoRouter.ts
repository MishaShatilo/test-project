import { Router } from "express";
import { check } from "express-validator";
import { VideoController } from "../controllers/VideoController";
import tokenMiddleware from "../helpers/tokenMiddleware";
const VideoRouter = Router()
/* CRUD*/ 
VideoRouter.post('/create/:userId',[
    check('videoName',"Вы должны дать название видео").notEmpty()],
    tokenMiddleware,
     VideoController.create);
VideoRouter.get('/findone/:userId/:videoName',tokenMiddleware,VideoController.findOne);
VideoRouter.get('/findall/:userId',tokenMiddleware, VideoController.findAll);
VideoRouter.put('/update/:videoId',tokenMiddleware,VideoController.update);
VideoRouter.delete('/delete/:videoId',tokenMiddleware ,VideoController.delete);
/* Шаринг видео*/ 
VideoRouter.get('/share/:videoName',VideoController.share)
VideoRouter.get('/watch/:videoLink',VideoController.watch)
export {VideoRouter};
