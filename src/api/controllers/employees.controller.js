const status = require('http-status');
const {
  getAllEmployees,
  getEmployeeDetails,
  getEmployeeShortInfo,
  getEmployeesByDeptId
} = require('@smg/client');

const { toWithCache, ReE, ReS, decodeJWT } = require('../lib/extensions');
const CONFIG = require('../../config');

module.exports.getAll = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const [err, response] = await toWithCache(
    getAllEmployees(token, CONFIG.smg.host),
    req.originalUrl || req.url
  );

  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, { data: response.Profiles });
};

module.exports.getAllWithShortModel = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const [err, response] = await toWithCache(
    getEmployeeShortInfo(true, token, CONFIG.smg.host),
    req.originalUrl || req.url
  );
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, { data: response.data.Profiles });
};

module.exports.getEmployeeByProfileId = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const { id } = req.params;
  const [err, response] = await toWithCache(
    getEmployeeDetails(id, token, CONFIG.smg.host),
    req.originalUrl || req.url
  );
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, { data: response.data.Profile });
};

module.exports.getAllEmployeesByDeptId = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const { id } = req.params;
  const [err, response] = await toWithCache(
    getEmployeesByDeptId(id, token, CONFIG.smg.host),
    req.originalUrl || req.url
  );
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, { data: response.data.Profiles });
};
