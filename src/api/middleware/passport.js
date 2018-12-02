const { ExtractJwt, Strategy } = require('passport-jwt');
const CONFIG = require('../../config');
const { to } = require('../lib/extensions');
const { verify } = require('../services/auth.service');

// eslint-disable-next-line func-names
module.exports = function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwt.secret;

  passport.use(
    new Strategy(opts, async (payload, done) => {
      const [err, user] = await to(verify(payload.token));
      if (err) return done(err, false);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};
