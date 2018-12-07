/* eslint-disable no-console */
const redis = require('redis');
const { promisify } = require('util');
const symbols = require('log-symbols');
const config = require('../../config/environment');

const client = redis.createClient(config.redis.port, config.redis.host);

client.on('connect', () => {
  console.log(symbols.success, `Redis started on ${config.redis.host}:${config.redis.port}\n`);
});

client.on('error', err => {
  console.error('Redis:', err);
});

// client.monitor(() => {
//   console.log('Entering monitoring mode.');
// });

// client.on('monitor', (time, args) => {
//   console.log(`${time}: ${args}`); // 1458910076.446514:['set', 'foo', 'bar']
// });

// const getAsync = key =>
//   new Promise((resolve, reject) => {
//     client.get(key, (err, data) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(JSON.parse(data));
//     });
//   });

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};
