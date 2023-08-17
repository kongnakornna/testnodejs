import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
export default async function index(fastify: FastifyInstance) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
   reply.code(200).send({statusCode: 200,  ok: true, message: "Hello world!" })
  })
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({statusCode: 200,  ok: true, message: "Hello world!" })
   })
  fastify.get('/jwt/sign', async (request: FastifyRequest, reply: FastifyReply) => {
    const token = fastify.jwt.sign({
      firstName: 'kongnakorn',
      lastName: 'jantakun'
    })
   reply.code(200).send({ statusCode: 200,  ok: true, token })

  })
  fastify.get('/jwt/private', {
    preValidation: [fastify.authenticate]
  }, async (request: FastifyRequest, reply: FastifyReply) => {
   reply.code(200).send({ statusCode: 200,  ok: true, message: "Protected area!" })
  })
  fastify.post('/verifytoken', {preValidation: [fastify.authenticate]/*ตรวจสอบ Tokem*/}, async (request: FastifyRequest, reply: FastifyReply) => {
      const headers: any = request.headers;           
      const body: any = request.body;   
      const host: any = headers.host;  
      const secret_key: any = headers.secret_key;
      const str: any = request.headers.authorization; 
      const token: any = str.replace("Bearer ", "");  
      const token_bearer: any = fastify.jwt.verify(token); 
      console.warn(`token_bearer `, token_bearer);
      const start_token: any = token_bearer.iat;
      const end_token: any = token_bearer.exp; 
        reply.code(200).send({
                              statusCode: 200,
                              ok: true,
                              message: "Verify token successful!",
                              error: "OK",  
                              response: {
                                          data: token_bearer,
                                          start_token: start_token, 
                                          end_token: end_token,   
                                      }     
      })
      return  // exit process     
  })
}