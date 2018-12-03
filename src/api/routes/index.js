const express = require('express');
const passport = require('passport');
// const path = require('path');
const { version } = require('../../../package.json');

const router = express.Router();

const UserController = require('../controllers/user.controller');
const EmployeesController = require('../controllers/employees.controller');

require('../middleware/passport')(passport);

/* GET home page. */
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Parcel Pending API',
    data: { version_number: `v${version}` }
  });
});

router.post('/users/login', UserController.login);

router.get(
  '/employees',
  passport.authenticate('jwt', { session: false }),
  EmployeesController.getAll
);

module.exports = router;
