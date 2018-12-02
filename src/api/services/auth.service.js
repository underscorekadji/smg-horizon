const { createInstance, Instance } = require('@smg/client');
const CONFIG = require('../../config');

module.exports.authenticate = async (email, password) => {
  const instance = await createInstance(email, password, CONFIG.smg.host);
  const { token } = instance;
  return { token };
};

module.exports.verify = async token => {
  const instance = new Instance('', '', CONFIG.smg.host);
  const response = await instance.getAllDepartments(token);
  if (response && !response.data.ErrorCode) {
    return true;
  }

  return false;
};
