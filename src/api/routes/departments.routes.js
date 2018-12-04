const router = require('express').Router();
const passport = require('passport');

// const controller = require('../controllers/departments.controller');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.params;
  res.send(`Departments /${id}`);
});

module.exports = router;
