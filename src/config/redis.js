const redis = require('redis');
const config = require('./environment');

const client = redis.createClient(config.redis.port, config.redis.host);
client.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Redis: client connected.');
});

client.on('error', err => {
  // eslint-disable-next-line no-console
  console.error('Redis:', err);
});

module.exports.redis = client;
