const {Router} = require('express');

const mainRouter = Router();
const requireAuth = require('../middlewares/authenticationToken');

const login = require('../controllers/usersControllers/login');
const signUp = require('../controllers/usersControllers/signUp');
const logOut = require('../controllers/usersControllers/logOut');

const sendInvitation = require('../controllers/usersControllers/sendInvitation');
const getAllContacts = require('../controllers/usersControllers/getAllContacts');
const addContact = require('../controllers/usersControllers/addContact');
const deleteContact = require('../controllers/usersControllers/deleteContact');
const getContactByUserName = require('../controllers/usersControllers/getContactByUserName');

const getAllBoards = require('../controllers/boardControllers/getAllBoards');
const getBoardById = require('../controllers/boardControllers/getBoardById');
const postBoard = require('../controllers/boardControllers/postBoard');
const modifyBoard = require('../controllers/boardControllers/modifyBoard');
const addContributor = require('../controllers/boardControllers/addContributorToBoard');
const deleteBoard = require('../controllers/boardControllers/deleteBoard');
const deleteContributor = require('../controllers/boardControllers/deleteContributor');

//rutas

// User
mainRouter.post('/login', login);
mainRouter.post('/signUp', signUp);
mainRouter.get('/logOut', logOut);

// relacionado a contactos
mainRouter.post('/contact/check', requireAuth, sendInvitation); // o deberia ser un get?
mainRouter.get('/contact/:user_id',requireAuth, getAllContacts);
mainRouter.delete('/contact/:user_id', requireAuth, deleteContact);
mainRouter.post('/contact/add', requireAuth, addContact)
mainRouter.get('/contact', requireAuth, getContactByUserName);

// boards

mainRouter.get('/board/:user_id',requireAuth, getAllBoards)
mainRouter.get('/board/s/:board_id',requireAuth, getBoardById)

mainRouter.post('/board/new',requireAuth, postBoard)
mainRouter.put('/board/:board_id',requireAuth, modifyBoard)
mainRouter.put('/board/contributor/:user_id',requireAuth, addContributor)

mainRouter.delete('/board/contributor/:id', requireAuth,deleteContributor);
mainRouter.delete('/board/:id', requireAuth,deleteBoard)


module.exports = mainRouter;

