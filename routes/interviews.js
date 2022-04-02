const router = require('express').Router();
const { allocateInterview, setresultStatus, getStudents } = require('../controllers/interview');

router.post('/:id', allocateInterview);
router.get('/:id', getStudents);
router.patch('/:id', setresultStatus );

module.exports = router;