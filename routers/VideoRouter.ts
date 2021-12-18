import { Router } from "express";
import { check } from "express-validator";
import { VideoController } from "../controllers/videoController";
import tokenMiddleware from "../helpers/tokenMiddleware";
const checker = check("videoName", "Вы должны дать название видео").notEmpty();
const VideoRouter = Router();
/* CRUD*/
VideoRouter.post(
  "/create/:userid",
  [checker, tokenMiddleware],
  VideoController.create
);
VideoRouter.get(
  "/findone/:videoName",
  tokenMiddleware,
  VideoController.findOne
);
VideoRouter.get("/findall/:userId", tokenMiddleware, VideoController.findAll);
VideoRouter.put("/update/:videoId", tokenMiddleware, VideoController.update);
VideoRouter.delete("/delete/:videoId", tokenMiddleware, VideoController.delete);
/* Шаринг видео*/
VideoRouter.get("/share/:videoName", tokenMiddleware, VideoController.share);
VideoRouter.get("/watch/:videoLink", tokenMiddleware, VideoController.watch);
export { VideoRouter };
