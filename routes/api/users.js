const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);
// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;