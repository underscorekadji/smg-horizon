const status = require('http-status');

const {
  getAllEmployees,
  getEmployeeDetails,
  getEmployeeShortInfo,
  getEmployeesByDeptId
} = require('@smg/client');

const { to, ReE, ReS, decodeJWT } = require('../lib/extensions');
const CONFIG = require('../../config');

module.exports.getAll = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const [err, response] = await to(getAllEmployees(token, CONFIG.smg.host));
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, { data: response.data.Profiles });
};

module.exports.getAllWithShortModel = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const [err, response] = await to(getEmployeeShortInfo(true, token, CONFIG.smg.host));
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, { data: response.data.Profiles });
};

module.exports.getEmployeeByProfileId = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const { id } = req.params;
  const [err, response] = await to(getEmployeeDetails(id, token, CONFIG.smg.host));
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, { data: response.data.Profile });
};

module.exports.getAllEmployeesByDeptId = async (req, res) => {
  const { token } = decodeJWT(req.headers.authorization);
  const { id } = req.params;
  const [err, response] = await to(getEmployeesByDeptId(id, token, CONFIG.smg.host));
  if (err) return ReE(res, err, status.BAD_REQUEST);
  return ReS(res, { data: response.data.Profiles });
};
