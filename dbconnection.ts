import { Sequelize } from 'sequelize-typescript'
import { Token } from './models/token'
import {User2} from './models/users'
import { Video } from './models/video'


require('dotenv').config()
export const sequelize = new Sequelize({
  database: process.env.database,
  dialect: 'mysql',
  username: 'root',
  password: process.env.PASSWORD,
  storage: ':memory:',
  models: [User2,Token,Video] 
})
