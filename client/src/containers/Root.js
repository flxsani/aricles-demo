
if (process.env.NODE_ENV === 'production') {
  module.exports = require('../routes/Routes.dev')
} else {
  module.exports = require('../routes/Routes.dev')
}