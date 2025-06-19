import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { criarTarefaController } from "./criar"
import { listarTarefasGlobaisController } from "./listar-globais"


export async function tarefasRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/tarefas', criarTarefaController)
  app.get('/tarefas/tipos', listarTarefasGlobaisController)
}