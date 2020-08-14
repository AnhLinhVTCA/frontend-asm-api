const bcrypt = require("bcrypt");

module.exports = {
  hash: (string, saltRounds = 10) => new Promise(resolve => {
    bcrypt.hash(string, saltRounds, (err, hash) => {
      if (err) resolve('');
      resolve(hash);
    })
  }),
  compare: (string, hash) => new Promise((resolve) => {
    bcrypt.compare(string, hash, (err, result) => {
      if (err) resolve(false);
      resolve(result);
    });
  }),
}