import { Request, Response } from "express";
import { dbFunc } from "../database/dbFunctions";

class Controller {
  async create(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const userId = +userid;
      const { videoName, videoLink } = req.body;
      const video = dbFunc.create({ userId, videoName, videoLink });
      if (video) {
        return res.status(200).json("Видео успешно сохранено");
      }
    } catch (e) {
      res.send(e);
    }
  }
  async findOne(req: Request, res: Response) {
    const { videoName } = req.params;
    const video = await dbFunc.findOneByName({ videoName });
    if (!video) {
      return res.status(400).json("Такое видео не найдено");
    }
    res.status(200).json(video.videoLink);
  }
  async findAll(req: Request, res: Response) {
    const { id } = req.params;
    const userId = +id;
    const videos = await dbFunc.findAll({ userId });
    if (!videos) {
      return res.status(400).json("У вас нет ни одного видео ");
    }
    const links = videos.map((e) => {
      return e.videoLink;
    });
    res.json(links);
  }
  async update(req: Request, res: Response) {
    const { videoId } = req.params;
    const { videoName, videoLink } = req.body;
    const id = +videoId;
    const updatedVideo = await dbFunc.update({ id, videoName, videoLink });
    if (!updatedVideo) {
      return res.status(400).json("Неудалось обновить видео");
    }
    return res.status(200).json("Успешно обновлено");
  }
  async delete(req: Request, res: Response) {
    const { videoId } = req.params;
    const id = +videoId;
    const deletedVideo = dbFunc.delete({ id });
    if (!deletedVideo) {
      res.status(400).json("Неудалось удалить данное видео");
    }
    res.status(200).json("Удаление прошло успешно");
  }
  async share(req: Request, res: Response) {
    const { videoName } = req.params;
    const sharedVideo = await dbFunc.findOneByName({ videoName });
    if (!sharedVideo) {
      res.status(400).json("Вы не можете поделиться данным видео");
    }
    /* В идеале в моем понимании вернется ссылка которую я обрабатываю в след функции */
    res.json(sharedVideo.videoLink);
  }
  async watch(req: Request, res: Response) {
    const { videoLink } = req.params;
    const video = await dbFunc.findOneByLink({ videoLink });
    if (!video) {
      res.status(400).json("Не удалось загрузить видео");
    }
    /* обработал ссылку из метода share и верну пользователю видос которым поделился чел  */
    res.json(video);
  }
}
const VideoController = new Controller();
export { VideoController };
