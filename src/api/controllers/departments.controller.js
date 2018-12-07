const { getAllDepartments } = require('@smg/client');
const status = require('http-status');

const { toWithCache, ReE, ReS, decodeJWT } = require('../lib/extensions');
const CONFIG = require('../../config');

module.exports.getAll = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const [err, response] = await toWithCache(
    getAllDepartments(token, CONFIG.smg.host),
    req.originalUrl || req.url
  );

  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, { data: response.Depts });
};
