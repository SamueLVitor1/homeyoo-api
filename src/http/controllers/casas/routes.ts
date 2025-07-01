import { FastifyInstance } from 'fastify'
import { criarCasaController } from './criar'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { entrarNaCasaController } from './entrar'
import { buscarCasaIdController } from './buscar-id'
import { listarMembrosCasaController } from './listar-membros'
import { listarTarefasPorCasaController } from './listar-tarefas'
import { buscarRankingController } from './buscar-ranking'


export async function casasRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/casas', criarCasaController)
  app.patch('/casas/entrar/:codigo', entrarNaCasaController)
  app.get('/casas/:id', buscarCasaIdController)
  app.get('/casas/:id/membros', listarMembrosCasaController)
  app.get('/casas/:id/tarefas', listarTarefasPorCasaController)
  app.get('/casas/:id/ranking', buscarRankingController)
}