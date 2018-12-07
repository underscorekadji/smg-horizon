const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/requests.controller');

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

router.get('/form/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.params;
  res.send(`Requests /form/${id}`);
});

module.exports = router;
