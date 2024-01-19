const {Router} = require('express');
const login = require('../controllers/usersControllers/login');
const signUp = require('../controllers/usersControllers/signUp');
const logOut = require('../controllers/usersControllers/logOut');
const mainRouter = Router();

//handlers require

//rutas
mainRouter.post('/login', login);
mainRouter.post('/signUp', signUp);
mainRouter.get('/logOut', logOut);

module.exports = mainRouter;

