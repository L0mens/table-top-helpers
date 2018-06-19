const express = require('express');
const router = express.Router();
const plateauController = require('../controllers/plateauController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const horrorController = require('../controllers/horrorController');

// Do work here
router.get('/', (req, res) => {
  res.render('home', {title: 'Home'});
});

router.get('/plateau', plateauController.initPlateau);
router.post('/plateau', plateauController.displayPlateau);

router.get('/register', userController.registerForm);
router.post('/register', userController.validateRegister,
 userController.register,
 authController.login);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
 
router.get('/logout', authController.logout);

router.get('/admin', authController.userIsAdmin,
  userController.adminPanel);

router.get('/horror', horrorController.horrorDefault);
router.get('/horror/add-card', horrorController.horrorAddCard);
router.post('/horror/add-card', horrorController.horrorAddCardInBase);
router.get('/horror/list-card', horrorController.horrorListCard);

module.exports = router;
