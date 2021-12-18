import { User2 } from "../models/users";
import bcrypt from "bcrypt";
import { token } from "../helpers/tokenHelper";
import { TokenDto } from "../helpers/tokenInterface";

interface Service {
  username: string;
  password: string;
}

class UserService {
  async registration({ username, password }: Service, res) {
    const candidate = await User2.findOne({ where: { username: username } });
    if (candidate) {
      return res.status(400).send("Пользователь с таким имененм существует");
    }
    const hashpass = bcrypt.hashSync(password, 5);
    const newUser = await User2.create({
      username: username,
      password: hashpass,
    });
    const tokenDto = new TokenDto(newUser);
    const tokens = token.generateTokens({ ...tokenDto });
    await token.saveToken(tokenDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: tokenDto,
    };
  }

  async login({ username, password }: Service, res) {
    const userFromDb = await User2.findOne({
      where: { username: username },
      raw: true,
    });
    if (!userFromDb) {
      return res.status(400).send("пользователь с таким именем не найден");
    }
    const validPassword = bcrypt.compareSync(password, userFromDb.password);
    if (!validPassword) {
      return res.status(400).send("Введен неверный пароль");
    }
    const tokenDto = new TokenDto(userFromDb);
    const tokens = token.generateTokens({ ...tokenDto });
    await token.saveToken(tokenDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: tokenDto,
    };
  }
}
const userService = new UserService();
export { userService };
