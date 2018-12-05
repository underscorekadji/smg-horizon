const { to } = require('await-to-js');
const pe = require('parse-error');
const { stringify } = require('flatted');
const jwt = require('jsonwebtoken');
const CONFIG = require('../../config');

module.exports.to = async promise => {
  const [err, res] = await to(promise);
  if (err) return [pe(err)];

  return [null, res];
};

/** Response Failure */
module.exports.ReE = function ReE(res, err, code) {
  let error;
  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    error = err.message;
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json({ success: false, error });
};

/** Response Success */
module.exports.ReS = function ReS(res, data, code) {
  let result = { success: true };

  if (typeof data === 'object') {
    result = Object.assign(data, result);
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json(result);
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
