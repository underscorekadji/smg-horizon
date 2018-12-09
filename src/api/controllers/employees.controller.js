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
  const [err, data] = await toWithCache(
    getAllEmployees(token, CONFIG.smg.host).then(response => response.data.Profiles),
    req.originalUrl || req.url
  );
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, data);
};

module.exports.getAllWithShortModel = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const initialRequest = req.query.initialRequest || true;
  const [err, data] = await toWithCache(
    getEmployeeShortInfo(initialRequest, token, CONFIG.smg.host).then(
      response => response.data.Profiles
    ),
    req.originalUrl || req.url
  );
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, data);
};

module.exports.getEmployeeByProfileId = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const { id } = req.params;
  const [err, data] = await toWithCache(
    getEmployeeDetails(id, token, CONFIG.smg.host).then(response => response.data.Profile),
    req.originalUrl || req.url
  );
  console.log(typeof data);
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, data);
};

module.exports.getAllEmployeesByDeptId = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const { id } = req.params;
  const [err, data] = await toWithCache(
    getEmployeesByDeptId(id, token, CONFIG.smg.host).then(response => response.data.Profiles),
    req.originalUrl || req.url
  );
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, data);
};
