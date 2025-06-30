import { MongoTarefaRepository } from "../../repositories/mongo/tarefa-repository"
import { ContarTarefasPendentesUseCase } from "../tarefas/contar-tarefas-pendentes"
import { ListarTarefasPorCasaUseCase } from "../tarefas/listar-por-casa"

export function makeContarTarefasPendentesUseCase() {
  const repo = new MongoTarefaRepository()

  return new ContarTarefasPendentesUseCase(repo)
}