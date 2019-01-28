const restify = require('restify')

const server = restify.createServer({
  name: 'restify-upload'
})

server.use(restify.plugins.bodyParser())
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())

require('./routes/index')(server)

server.listen(3000, () => {
  console.log('Server running at port 3000')
})