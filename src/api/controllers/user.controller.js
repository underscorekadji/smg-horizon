const { authenticate } = require('../services/auth.service');
const { to, ReE, ReS, getJWT } = require('../lib/extensions');

const login = async (req, res) => {
  const { body } = req;
  const [err, data] = await to(authenticate(body.username, body.password));
  if (err) return ReE(res, err, 422);

  return ReS(res, { token: getJWT(data) });
};

module.exports.login = login;
