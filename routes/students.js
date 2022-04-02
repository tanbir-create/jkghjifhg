const { Router } = require('express');
const router = Router();
const { addNew } = require('../controllers/students')


router.post('/new', addNew);

module.exports = router;