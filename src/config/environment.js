const dotenv = require('dotenv');
const joi = require('joi');

// eslint-disable-next-line no-underscore-dangle
const __webUrlRegExp = new RegExp(
  '^' +
    // protocol identifier (optional)
    // short syntax // still required
    '(?:(?:(?:https?|ftp):)?\\/\\/)' +
    // user:pass BasicAuth (optional)
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    // IP address exclusion
    // private & local networks
    '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
    '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
    '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
    '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
    '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
    // host & domain names, may end with dot
    // can be replaced by a shortest alternative
    // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
    '(?:' +
    '(?:' +
    '[a-z0-9\\u00a1-\\uffff]' +
    '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
    ')?' +
    '[a-z0-9\\u00a1-\\uffff]\\.' +
    ')+' +
    // TLD identifier name, may end with dot
    '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
    ')' +
    // port number (optional)
    '(?::\\d{2,5})?' +
    // resource path (optional)
    '(?:[/?#]\\S*)?' +
    '$',
  'i'
);

const schema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid('development', 'test', 'production')
      .default('development'),
    APP_PORT: joi.number().default(3001),
    SMG_HOST: joi
      .string()
      .regex(__webUrlRegExp)
      .default('https://smg.itechart-group.com/MobileServiceNew/MobileService.svc'),
    JWT_ENCRYPTION: joi.string().default('d3005471-fc17-45f1-b6aa-e82fb9604d56'),
    JWT_EXPIRATION: joi.number().default(10000),
    REDIS_HOST: joi
      .string()
      .regex(__webUrlRegExp)
      .default('127.0.0.1'),
    REDIS_PORT: joi.number().default(6379),
    REDIS_EXPIRE: joi
      .number()
      .positive()
      .default(900) // 15 minute
  })
  .unknown()
  .required();

dotenv.config();
const path = `${__dirname}/../.env`;
dotenv.config({ path });

const { error, value: envVars } = joi.validate(process.env, schema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  app: {
    environment: envVars.NODE_ENV,
    port: envVars.APP_PORT
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    expiration: envVars.REDIS_EXPIRE
  },
  smg: {
    host: envVars.SMG_HOST
  },
  jwt: {
    secret: envVars.JWT_ENCRYPTION,
    expiration: envVars.JWT_EXPIRATION
  }
};
