import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { criarTarefaController } from "./criar"
import { listarTarefasGlobaisController } from "./listar-globais"
import { concluirTarefaController } from "./concluir"
import { contarTarefasPendentesController } from "./contar-pendentes"
import { contarTarefasConcluidasController } from "./contar-concluidas"
import { buscarTarefasPendentesController } from "./buscar-tarefas-pendentes"


export async function tarefasRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/tarefas', criarTarefaController)
  app.get('/tarefas/tipos', listarTarefasGlobaisController)
  app.patch('/tarefas/concluir', concluirTarefaController)
  app.get('/tarefas/pendentes/count', contarTarefasPendentesController)
  app.get('/tarefas/concluidas/count', contarTarefasConcluidasController)
  app.get('/tarefas/pendentes', buscarTarefasPendentesController)
}