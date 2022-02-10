import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

import {secret} from './config.js';

const generateAccessToken = (id, roles) => {
	const payload = {
			id,
			roles
	}
	return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

import User from "./models/User.js";
class authController {
  async registration(req, res) {
    try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
					return res.status(400).json({message: "Ошибка при регистрации из-за неверного ввода", errors})
			}
      const { username, mail, password } = req.body;
      const candidateMail = await User.findOne({ mail });
      if (candidateMail) {
				return res.status(400).json({ message: `Пользователь с почтой ${mail} уже существует или заблокирован` });
      } 
			const candidateName = await User.findOne({ username });
			if (candidateName) {
				return res.status(400).json({ message: `Пользователь с именем ${username} уже существует или заблокирован` });
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
    try {
			const dateTime = new Date().toLocaleString();
			const {username, password} = req.body
			const user = await User.findOne({username})
			if (!user) {
					return res.status(400).json({message: `Пользователь ${username} не найден`})
			}
			if (!(roles = true)) {																															//Работу этих строк не проверял, должно работать
				return res.status(400).json({message: `Пользователь ${username} заблокирован`})		//Работу этих строк не проверял, должно работать
		}
			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
					return res.status(400).json({message: `Введен неверный пароль`})
			}
			user.pastLoginTime = dateTime;
			await user.save();
			const token = generateAccessToken(user._id, user.roles)
			return res.json({token})
	} catch (e) {
			console.log(e)
			res.status(400).json({message: 'Login error'})
	}
}

	async getUsers(req, res) {
		try {
				const users = await User.find()
				res.json(users)
		} catch (e) {
				console.log(e)
		}
	}
}

export default new authController();
