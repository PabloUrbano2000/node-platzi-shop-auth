const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInNjb3BlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NTc0OTk1ODV9.UXSehwphTxUK4ojIJzHUaFaJDA7GOoPxC5fBz2Q_fyM'

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);
