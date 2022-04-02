const express = require('express');
const router = express.Router();
const { adminSignUp, adminLogin } = require('../controllers/admins')

// router.get('/me', )
router.post('/signup', adminSignUp);
router.post('/login', adminLogin);

module.exports = router;
