import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import User from "./models/User.js";
class authController {
  async registration(req, res) {
    try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
					return res.status(400).json({message: "Ошибка при регистрации из-за неверного ввода", errors})
			}
      const { username, mail, password } = req.body;
      const candidate = await User.findOne({ mail });
      if (candidate) {
				return res.status(400).json({ message: `Пользователь с таким ${mail} уже существует или заблокирован` });
      } 
			const date = new Date().toLocaleDateString();
      const hashPassword = bcrypt.hashSync(password, 4);
      // const userRole = await Role.findOne({ value: "true" });
      const user = new User({username, mail, password: hashPassword, roles: 'true', registrationTime: date,
      });
      await user.save();
      return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
		const dateTime = new Date().toLocaleString();
    try {
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req, res) {
    res.json("server work+");
  }
  catch(e) {
    console.log(e);
  }
}

export default new authController();
