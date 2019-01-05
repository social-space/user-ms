const jwt = require('jsonwebtoken');
const config = require('config');
const algorithm = 'ES512';
const publicKey = config.get('keys.jwt.public');

module.exports = {
    publicKey: publicKey,
    algorithm: algorithm,
    verify: function (payload) {
        return new Promise((resolve, reject) => {
            jwt.verify(payload, publicKey, {
                algorithms:[algorithm]
            }, function (err, decoded) {
                if(err) {reject(err); return;}
                resolve(decoded)
            })
        })
    }
}