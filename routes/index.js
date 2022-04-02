const express = require('express');
const router = express.Router();
const adminsRoute = require('./admins');
const studentsRoute = require('./students')
const companyRoute = require('./company')
const interviewRoute = require('./interviews')
const auth = require('../middlewares/auth');

router.use('/admin', adminsRoute)
router.use('/students', auth, studentsRoute)
router.use('/company', auth, companyRoute)
router.use('/interview', auth, interviewRoute)

module.exports = router;