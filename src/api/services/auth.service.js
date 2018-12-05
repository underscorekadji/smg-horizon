const _ = require('lodash');
const { createInstance, Instance } = require('@smg/client');
const CONFIG = require('../../config');

module.exports.authenticate = async (username, password) => {
  // Get sessionId as token
  const instance = await createInstance(username, password, CONFIG.smg.host);
  const { token } = instance;

  if (token === '0') return { token: null, profileId: null };

  // Get all employees
  const employees = await instance.getAllEmployees();

  // Split the username into firstname and lastname.
  const parts = username.split('.');
  const surname = parts[1];

  // Find all profiles with equal lastname
  const profiles = _.filter(
    employees.data.Profiles,
    profile => profile.LastNameEng.toLowerCase().indexOf(surname) !== -1
  );

  if (profiles && profiles.length === 0) return { token, profileId: null };
  const promises = [];

  profiles.forEach(profile => {
    promises.push(
      instance
        .getEmployeeDetails(profile.ProfileId)
        .then(response => response.data.Profile)
        .catch(error => {
          throw new Error('Error: ', error);
        })
    );
  });

  const result = await Promise.all(promises).then(data => data);

  const profile = _.find(result, async obj => obj.DomenName.toLowerCase() === username);

  return { token, profile };
};

module.exports.verify = async token => {
  const instance = new Instance('', '', CONFIG.smg.host);
  const response = await instance.getAllDepartments(token);
  if (response && !response.data.ErrorCode) {
    return true;
  }

  return false;
};
