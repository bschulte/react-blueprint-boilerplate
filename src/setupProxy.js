const proxy = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(proxy('/users', { target: 'http://localhost:5555/' }))
}
