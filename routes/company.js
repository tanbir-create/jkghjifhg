const router = require('express').Router();
const { addNew } = require('../controllers/company');


router.post('/new', addNew);

module.exports = router;