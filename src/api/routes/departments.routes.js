const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/departments.controller');

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

module.exports = router;
