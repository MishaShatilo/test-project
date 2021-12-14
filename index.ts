import express from 'express';
import fs from 'fs'
import util from 'util'
import { UserRouter } from './routers/UserRouter';
import { VideoRouter } from './routers/VideoRouter';
import {sequelize} from './dbconnection'
import cookieParser from 'cookie-parser'

require('dotenv').config()
/* логирование ошибок */
let log_file_err=fs.createWriteStream(__dirname + '/error/errors.txt',{flags:'a'});  
process.on('uncaughtExceptionMonitor', function(err) {
log_file_err.write(util.format('Caught exception: '+err) + '\n');
});

const pass = process.env.PASSWORD;
const port = process.env.PORT || 5000;
const app = express()
/* дб конекшн */
sequelize.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

app.use(express.json())
app.use(cookieParser())
app.use("/auth",UserRouter)
app.use("/video",VideoRouter)

const start = async () =>{
    try {
        
        app.listen(port, () => console.log("server at port: " + port ));
        
    } catch (e) {
        console.log(e)
    }
}
start()


