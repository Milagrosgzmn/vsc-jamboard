const {Router} = require('express');
const login = require('../controllers/usersControllers/login');
const signUp = require('../controllers/usersControllers/signUp');
const logOut = require('../controllers/usersControllers/logOut');
const sendInvitation = require('../controllers/usersControllers/sendInvitation');
const getAllContacts = require('../controllers/usersControllers/getAllContacts');
const addContact = require('../controllers/usersControllers/addContact');

const mainRouter = Router();

const requireAuth = require('../middlewares/authenticationToken');
const deleteContact = require('../controllers/usersControllers/deleteContact');
const postBoard = require('../controllers/boardControllers/postBoard');
const modifyBoard = require('../controllers/boardControllers/modifyBoard');


//rutas

// User
mainRouter.post('/login', login);
mainRouter.post('/signUp', signUp);
mainRouter.get('/logOut', logOut);

// relacionado a contactos
mainRouter.post('/contact/check', requireAuth, sendInvitation); // o deberia ser un get?
mainRouter.get('/contact/:user_id',requireAuth, getAllContacts);
mainRouter.delete('/contact/:user_id', deleteContact);
mainRouter.post('/contact/add', addContact)

// boards
mainRouter.post('/board/new', postBoard)
mainRouter.put('/board/:board_id', modifyBoard)
//mainRouter.put('/board/contributor/:user_id', addContributor)
//mainRouter.delete('/board/:board_id', deleteBoard)

module.exports = mainRouter;

