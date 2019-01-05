const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('../jwt');

let opts = {};
opts.algorithms = [jwt.algorithm]
opts.jwtFromRequest = ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    function(req) {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['jwt'];
        }
        return token;
    }
]);
opts.secretOrKey = jwt.publicKey;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {

    if(!jwt_payload) {
        return done(null, false);
    }
    return done(null, {identity: jwt_payload});
}));

module.exports = passport