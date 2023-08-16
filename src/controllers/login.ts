import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import * as knex from 'knex'
import * as crypto from 'crypto'
export default async function login(fastify: FastifyInstance) {
  /******/
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const body: any = request.body
    const username: any =body.username
    const password : any = body.password
    console.log(`username=> `, username);  
    console.log(`password=> `, password);  
    try {
      const encPassword: any = crypto.createHash('md5').update(password).digest('hex')
      console.warn(`encPassword=> `, encPassword);  
      if (username=='admin' && encPassword=='21232f297a57a5a743894a0e4a801fc3') {
        const user: any = {}  
        user.username = username; 
        console.log(user)
        const token = fastify.jwt.sign({user})
        reply.code(200).send({token, message: 'Welcome!'})
      } else { 
        reply.code(401).send({ ok: false })
      }
    } catch (error) {
      console.log(error)
      reply.code(500).send({ ok: false, message: 'error'})
    }

  })
  /******/
  fastify.post('/verifytoken', {preValidation: [fastify.authenticate]/*ตรวจสอบ Tokem*/}, async (request: FastifyRequest, reply: FastifyReply) => {
    const headers: any = request.headers;           
    const body: any = request.body;   
    const host: any = headers.host;  
    const secret_key: any = headers.secret_key;
    const str: any = request.headers.authorization; // token in Bearer  header
    const token: any = str.replace("Bearer ", "");  
    const token_bearer: any = fastify.jwt.verify(token); 
    //console.warn(`token_bearer `, token_bearer);
    const start_token: any = token_bearer.iat;
    const end_token: any = token_bearer.exp; 
      reply.code(200).send({
                            statusCode: 200,
                            ok: true,
                            message: "Verify token successful!",
                            error: "OK",  
                            response: {
                                        data: token_bearer,  
                                    }     
    })
    return  // exit process     
  })
  /*****/
}