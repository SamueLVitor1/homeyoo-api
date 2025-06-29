import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { criarTarefaController } from "./criar"
import { listarTarefasGlobaisController } from "./listar-globais"
import { concluirTarefaController } from "./concluir"
import { buscarTarefasPendentesController } from "./buscar-pendentes"
import { buscarTarefasConcluidasController } from "./buscar-concluidas"


export async function tarefasRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/tarefas', criarTarefaController)
  app.get('/tarefas/tipos', listarTarefasGlobaisController)
  app.patch('/tarefas/concluir', concluirTarefaController)
  app.get('/tarefas/pendentes', buscarTarefasPendentesController)
  app.get('/tarefas/concluidas', buscarTarefasConcluidasController)
}