const { to } = require('await-to-js');
const pe = require('parse-error');
const { stringify } = require('flatted');
const jwt = require('jsonwebtoken');
const CONFIG = require('../../config');
const { getCache, setCache } = require('../lib/redis');

module.exports.to = async promise => {
  const [err, res] = await to(promise);
  if (err) return [pe(err)];

  return [null, res];
};

module.exports.toWithCache = async (promise, key, time = CONFIG.redis.expiration) => {
  const cacheKey = `${key}`;
  const cache = await getCache(cacheKey);

  if (!cache) {
    console.log('CACHE NOT FOUND!');
    const [error, res] = await to(promise);
    if (error) return [pe(error)];
    setCache(res, cacheKey, time);
    return [null, JSON.stringify(res)];
  }

  return [null, cache];
};

/** Response Failure */
module.exports.ReE = function ReE(res, err, code) {
  let error;
  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    error = err.message;
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json(error);
};

/** Response Success */
module.exports.ReS = function ReS(res, data, code) {
  if (typeof code !== 'undefined') res.statusCode = code;
  if (typeof data !== 'object') {
    res.setHeader('Content-Type', 'application/json');
    return res.send(data);
  }
  return res.json(data);
};

/** Throw new Error */
module.exports.TE = function TE(message, log) {
  if (log === true) {
    // eslint-disable-next-line no-console
    console.error(message);
  }

  throw new Error(message);
};

module.exports.toJson = function toJson(obj) {
  return stringify(obj);
};

module.exports.getJWT = function getJWT(data) {
  const { token, profile } = data;
  return `Bearer ${jwt.sign({ token, profile }, CONFIG.jwt.secret, {
    expiresIn: CONFIG.jwt.expiration
  })}`;
};

module.exports.decodeJWT = token => {
  const parts = token.split(' ');
  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];

    if (/^Bearer$/i.test(scheme)) {
      const encrypted = credentials;
      return jwt.verify(encrypted, CONFIG.jwt.secret);
    }
  }

  return null;
};
