import fs from "fs";
export const logger = fs.createWriteStream(__dirname + "/error/errors.txt", {
  flags: "a",
});
