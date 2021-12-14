import {Request, Response} from 'express'
import { where } from 'sequelize/types'
import { Video } from '../models/video'

class Controller{
    
    async create(req:Request, res: Response){
        try{
        const {userId} = req.params
        const {videoName,videoLink} = req.body
        const newVideo = await Video.create({userId:+userId,videoName:videoName,videoLink:videoLink})
        const savedVideo = await newVideo.save()
        if(savedVideo){
            return res.status(200).json("Видео успешно сохранено")
        }
        }
        catch(e){
            res.json(e)
        }
        
    }
    async findOne(req:Request, res: Response){
        const {userId,videoName} = req.params
        const video = await Video.findOne({where:{videoName:videoName}})
        if(!video){
            return res.status(400).json('Такое видео не найдено')
        }
        res.status(200).json(video.videoLink)
        
    }
    async findAll(req:Request, res: Response){
        const {userId} = req.params
        const videos = await Video.findAll({where:{userId:+userId}})
        if(!videos){
            return res.status(400).json("У вас нет ни одного видео ")
        }
        const links = []
        videos.forEach((e) =>{
            links.push(e.videoLink)
        })
        res.json(links)
    }
    async update(req:Request, res: Response){
        const {videoId} = req.params;
        const updatedVideo = await Video.update(req.body,{where:{id:+videoId}})
        if(!updatedVideo){
            return res.status(400).json("Неудалось обновить видео")
        }
        return res.status(200).json("Успешно обновлено")
    }
    async delete(req:Request, res: Response){
        const {videoId} = req.params
        const deletedVideo = Video.destroy({where:{id:+videoId}})
        if(!deletedVideo){
            res.status(400).json("Неудалось удалить данное видео")
        }
        res.status(200).json("Удаление прошло успешно")
    }
    async share(req:Request,res:Response){
        const {videoName} = req.params;
        const sharedVideo = await Video.findOne({where:{videoName:videoName}})
        if(!sharedVideo){
            res.status(400).json("Вы не можете поделиться данным видео")
        }
        /* В идеале в моем понимании вернется ссылка которую я обрабатываю в след функции */
        res.json(sharedVideo.videoLink)
    }
    async watch(req:Request,res:Response){
        const {videoLink} = req.params;
        const video = await Video.findOne({where:{videoLink:videoLink}})
        if(!video){
            res.status(400).json("Не удалось загрузить видео")
        }
        /* обработал ссылку из метода share и верну пользователю видос которым поделился чел  */
        res.json(video)
    }
}
const VideoController = new Controller()
export {VideoController}