import * as fastify from 'fastify'
import * as path from 'path'
const multer = require('fastify-multer')
const envPath = path.join(__dirname, '../config.conf')
require('dotenv').config({ path: envPath })
import routers from './router'
const app: fastify.FastifyInstance = fastify.fastify({
  logger: {
    level: 'info'
  }
})
app.register(multer.contentParser)
app.register(require('fastify-cors'))
app.register(require('fastify-formbody'))
app.register(require('./plugins/jwt'), {
  secret: process.env.JWT_SECRET || '$#200011124441##@'
})
app.register(routers)
export default app