const router = require('express').Router();
const passport = require('passport');
const { version } = require('../../../package.json');

require('../middleware/passport')(passport);

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Parcel Pending API',
    data: { version_number: `v${version}` }
  });
});

router.use('/users', require('./users.routes'));
router.use('/employees', require('./employees.routes'));
router.use('/departments', require('./departments.routes'));
router.use('/requests', require('./requests.routes'));

module.exports = router;
