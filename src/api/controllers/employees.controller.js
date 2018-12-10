const status = require('http-status');
const _ = require('lodash');
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
  const position = req.query.position || '';
  const location = req.query.location || '';

  const [err, data] = await toWithCache(
    getAllEmployees(token, CONFIG.smg.host)
      .then(response => response.data.Profiles)
      // eslint-disable-next-line no-shadow
      .then(data => {
        if (position) {
          return _.filter(data, profile => profile.Position.toLowerCase().indexOf(position) !== -1);
        }
        return data;
      })
      // eslint-disable-next-line no-shadow
      .then(data => {
        if (location) {
          return _.filter(data, profile => profile.Room.toLowerCase().indexOf(location) !== -1);
        }
        return data;
      }),
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
