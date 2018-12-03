const { getAllEmployees } = require('@smg/client');
const status = require('http-status');
const { to, ReE, ReS, decodeJWT } = require('../lib/extensions');
const CONFIG = require('../../config');

const getAll = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const [err, response] = await to(getAllEmployees(token, CONFIG.smg.host));
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, { data: response.data.Profiles });
};

module.exports.getAll = getAll;
