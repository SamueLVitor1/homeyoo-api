import { FastifyInstance } from 'fastify'
import { criarCasaController } from './criar'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { entrarNaCasaController } from './entrar'


export async function casasRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/casas', criarCasaController)
  app.patch('/casas/entrar/:codigo', entrarNaCasaController)
}