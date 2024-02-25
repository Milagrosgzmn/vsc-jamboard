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
const addContributor = require('../controllers/boardControllers/addContributorToBoard');
const getAllBoards = require('../controllers/boardControllers/getAllBoards');
const deleteBoard = require('../controllers/boardControllers/deleteBoard');
const deleteContributor = require('../controllers/boardControllers/deleteContributor');
const getBoardById = require('../controllers/boardControllers/getBoardById');

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

mainRouter.get('/board/:user_id',getAllBoards)
mainRouter.get('/board/s/:board_id', getBoardById)

mainRouter.post('/board/new', postBoard)
mainRouter.put('/board/:board_id', modifyBoard)
mainRouter.put('/board/contributor/:user_id', addContributor)

mainRouter.delete('/board/contributor/:id', deleteContributor);
mainRouter.delete('/board/:id', deleteBoard)


module.exports = mainRouter;

