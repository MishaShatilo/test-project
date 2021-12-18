import express from "express";
import { env } from "./config";
import { logger } from "./error/errorHandler";
import util from "util";
import { UserRouter } from "./routers/userRouter";
import { VideoRouter } from "./routers/videoRouter";
import { sequelize } from "./database/dbconnection";
import cookieParser from "cookie-parser";

require("dotenv").config();
/* логирование ошибок */
process.on("uncaughtExceptionMonitor", function (err) {
  logger.write(util.format("Caught exception: " + err) + "\n");
});

const app = express();
/* дб конекшн */
sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use("/auth", UserRouter);
app.use("/video", VideoRouter);

const start = async () => {
  try {
    app.listen(env.port, () => console.log("server at port: " + env.port));
  } catch (e) {
    console.log(e);
  }
};
start();
