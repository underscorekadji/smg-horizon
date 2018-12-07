const CONFIG = require('../../config');
const redisClient = require('../services/redis.service');

module.exports.getCache = async key => redisClient.getAsync(`__horizon__:${key}`);

module.exports.setCache = async (obj, key, time = CONFIG.redis.expiration) =>
  redisClient.setAsync(`__horizon__:${key}`, JSON.stringify(obj), 'EX', time);
