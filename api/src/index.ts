// Require the framework and instantiate it
import fastify from 'fastify';
import cookie from 'cookie';
import * as admin from 'firebase-admin';

const server = fastify({ logger: true });

let app = admin.initializeApp();
const auth = app.auth();

// Declare a route
server.get('/', async (request, reply) => {
  return { hello: 'world' }
})
server.get('/auth', async (request, reply) => {
  // validate request headers
  // bearer token in authorization or session cookie
  const cookies = cookie.parse(request.headers.cookie || '');
  const authHeader = request.headers.authorization || '';
  let idToken, user;
  if (authHeader.toLowerCase().includes('bearer')) {
    idToken = authHeader.split(' ')[1];
  }
  let authorized = false;
  try {
    if (idToken) {
      user = await auth.verifyIdToken(idToken);
      authorized = user !== undefined;
    }
    else {
      const session = cookies.session;
      if (session) {
        user = await auth.verifySessionCookie(session);
        authorized = user !== undefined;
      }
    }
  } catch(e) {
    reply.code(401).send(e);
  }

  if (authorized) {
    reply.code(200).send({
      user,
      cookies,
      headers: request.headers
    });
  }
  else {
    reply.code(401).send({
      user,
      cookies,
      headers: request.headers
    });
  }
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