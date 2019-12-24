const serverURL = process.env.NODE_ENV === 'development' ?
  'http://127.0.0.1:8080' : 'https://urmc-website-api.herokuapp.com';

module.exports = { serverURL }
