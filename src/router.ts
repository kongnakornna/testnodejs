import { FastifyInstance } from 'fastify'
import indexRouter from './controllers/index'
import loginRouter from './controllers/login'
export default async function router(fastify: FastifyInstance) {
  // router prefix
  fastify.register(indexRouter, { prefix: '/' }) 
  fastify.register(loginRouter, { prefix: '/login' }) 
}