import {check} from "express-validator";
import Router from "express";

import controller from './authController.js';
const router = new Router();

//запросы, прослушиваемые нашим роутером. requests

router.post('/registration',[
	check('username', "Введите имя пользователя").notEmpty(),
	check('password', "Введите пароль").notEmpty(),
	check('mail', "Введите адрес электронной почты").notEmpty(),
] ,controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers); //здесь можно сделать управление доступами для админа, пользователя или запрещать использовать этот метод неавторизованным 


export default router;