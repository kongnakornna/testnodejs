import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import * as knex from 'knex'
import * as crypto from 'crypto'
import singinSchema from '../schemas/singin' 
export default async function login(fastify: FastifyInstance) {
  fastify.post('/',{schema: singinSchema},  async (request: FastifyRequest, reply: FastifyReply) => {
    const body: any = request.body
    const username: any =body.username
    const password : any = body.password
    console.log(`username=> `, username);  
    console.log(`password=> `, password);  
    try {
      const encPassword: any = crypto.createHash('md5').update(password).digest('hex')
      console.warn(`encPassword=> `, encPassword);  
      if (username=='admin' && encPassword=='21232f297a57a5a743894a0e4a801fc3') {
        const user_id: number = 1 
        const user: any = {}  
        user.user_id = user_id; 
        user.username = username; 
        console.log(`user=> `,user)
        const token = fastify.jwt.sign({
                                          user
                                        },{ 
                                          expiresIn: '1d'	
                                        })
        console.log(`token=> `,token)
         /* 
                    expiresIn('2 days')  // 172800000
                    expiresIn('1d')      // 86400000
                    expiresIn('10h')     // 36000000
                    expiresIn('2.5 hrs') // 9000000
                    expiresIn('2h')      // 7200000
                    expiresIn('1m')      // 60000
                    expiresIn('5s')      // 5000
                    expiresIn('1y')      // 31557600000
                    expiresIn('100')     // 100
                    expiresIn('-3 days') // -259200000
                    expiresIn('-1h')     // -3600000
                    expiresIn('-200')    // -200
        */
        reply.code(200).send({statusCode: 200,ok: true, message: 'Welcome',token,response:{data:user}})
      } else { 
        reply.code(401).send({ statusCode: 401,ok: false, message: 'Error username or password incorrect',response:{data:null}})
      }
    } catch (error) {
      console.log(error)
      reply.code(500).send({ statusCode: 500,ok: false, message: 'error',response:{data:null}})
    }

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
  fastify.get('/private', {
    preValidation: [fastify.authenticate]/*ตรวจสอบ Tokem*/
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({ message: "Protected area!" })
  })
}