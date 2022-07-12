const jwt = require('jsonwebtoken');

const secret = 'myCat';

const jwtConfig = {
  expiresIn: '7d',
};

// objeto a encriptar
const payload = {
  sub: 1,
  scope: 'customer',
};

function signToken(payload, secret, jwtConfig = {}) {
  return jwt.sign(payload, secret, jwtConfig);
}

const token = signToken(payload, secret, jwtConfig);

console.log(token);
