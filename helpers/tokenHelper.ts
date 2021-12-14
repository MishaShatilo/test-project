import jwt from 'jsonwebtoken';
import { Token } from '../models/token';
class Tokens {
    generateTokens(payload:object){
        const accessToken = jwt.sign(payload, process.env.secretAccess, {expiresIn:process.env.expiresInToken})
        const refreshToken = jwt.sign(payload, process.env.secretRefresh, {expiresIn:process.env.expiresInRefresh})
        return{
            accessToken,
            refreshToken,
        }
    }
    async saveToken(userId: number, refreshToken: string){
        const tokendata = await Token.findOne({where:{userId:userId}})
        if(tokendata){
            tokendata.token = refreshToken;
            return tokendata.save()
        }
        const token = await Token.create({userId:userId, token:refreshToken})
        return token;
    }

    validateAccessToken(token:string){
        try {
            const userData = jwt.verify(token,process.env.secretAccess)
            return userData
        } catch (error) {
            return null;
        }
    }

    
}

const token = new Tokens()
export {token}