// Require the framework and instantiate it
import fastify from 'fastify';
const server = fastify({ logger: true });

// Declare a route
server.get('/', async (request, reply) => {
  return { hello: 'world' }
})
server.get('/auth', async (request, reply) => {
  // validate request headers
  // bearer token in authorization or session cookie
  reply.code(200).send({
    headers: request.headers
  });
})

// Run the server!
const start = async () => {
  server.listen(5000, '0.0.0.0', function (err, address) {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }
    server.log.info(`server listening on ${address}`)
  })
}
start()