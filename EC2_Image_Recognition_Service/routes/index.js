const restify = require('restify')
const uploadController = require('../controllers/uploadController')

module.exports = (index) => {
  server.get('/', (req, res) => {
    res.send('Working')
  })
}

module.exports = (server) => {
  server.post('/upload', uploadController.upload)
}