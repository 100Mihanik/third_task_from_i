import Router from "express";
import controller from './authController.js';
const router = new Router();

//запросы, прослушиваемые нашим роутером. requests

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers); //здесь можно сделать управление доступами для админа, пользователя или запрещать использовать этот метод неавторизованным 


export default router;