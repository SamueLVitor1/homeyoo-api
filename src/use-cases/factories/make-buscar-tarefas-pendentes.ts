import { MongoTarefaRepository } from "../../repositories/mongo/tarefa-repository"
import { BuscarTarefasPendentesUseCase } from "../tarefas/buscar-tarefas-pendentes"
import { ListarTarefasPorCasaUseCase } from "../tarefas/listar-por-casa"

export function makeBuscarTarefasPendentesUseCase() {
  const repo = new MongoTarefaRepository()

  return new BuscarTarefasPendentesUseCase(repo)
}