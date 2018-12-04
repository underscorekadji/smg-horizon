const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/employees.controller');

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

router.get(
  '/brief',
  passport.authenticate('jwt', { session: false }),
  controller.getAllWithShortModel
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getEmployeeByProfileId
);

router.get(
  '/dept/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getAllEmployeesByDeptId
);

module.exports = router;
