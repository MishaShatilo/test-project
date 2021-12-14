import {UserI} from '../models/users'
import {User2} from '../models/users'
import {Request, Response} from 'express'
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";
import {token} from '../helpers/tokenHelper'
import {TokenDto} from '../helpers/tokenInterface'




class Controller{
     async registration(req:Request , res: Response){
         try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message:"ошибка при регистрации",errors})
        }
            const {username, password } = req.body
            const candidate = await User2.findOne({where: {username: username}})
            if(candidate){
                return res.status(400).json({message:"Такой пользователь уже существует"})
            }
            const hashpass = bcrypt.hashSync(password, 5);
            const newUser = await User2.create({ username: username, password: hashpass })
            const savedUser = await newUser.save()
                .catch(e => res.json("Невозможно произвести регистрацию в данный момент "))
            if(savedUser){
                const tokenDto = new TokenDto(savedUser)
                const tokens = token.generateTokens({...tokenDto});
                await token.saveToken(tokenDto.id, tokens.refreshToken)
                res.json(tokens)
                res.cookie('refreshToken',tokens.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
                return res.status(200).json("Пользователь успешно зарегистрирован")
                
            }  
            
            

        }
        catch(e){
            console.log(e)
        }
    }
     
    async login(req: Request, res: Response){
        try {
            const {username, password } = req.body
            
            const userFromDb = await User2.findOne({where:{username:username}, raw:true}) 
            if(!userFromDb){
                return res.status(400).json("пользователь с таким именем не найден")
            }
            const validPassword = bcrypt.compareSync(password, userFromDb.password)
            if(!validPassword){
                return res.status(400).json("Введен неверный пароль")
            }
            const tokenDto = new TokenDto(userFromDb)
            const tokens = token.generateTokens({...tokenDto});
            await token.saveToken(tokenDto.id, tokens.refreshToken)
            return res.status(200).json('Добро пожаловать')
            
            
        } catch (error) {
            res.status(400).json({message:'login error'})
        }
    }
    
}
const controller = new Controller()
export {controller}