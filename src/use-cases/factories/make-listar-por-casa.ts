import { MongoTarefaRepository } from "../../repositories/mongo/tarefa-repository"
import { ListarTarefasPorCasaUseCase } from "../tarefas/listar-por-casa"

export function makeListarTarefasPorCasaUseCase() {
  const repo = new MongoTarefaRepository()

  return new ListarTarefasPorCasaUseCase(repo)
}