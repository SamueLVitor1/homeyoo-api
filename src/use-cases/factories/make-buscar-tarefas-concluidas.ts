
import { MongoTarefaRepository } from "../../repositories/mongo/tarefa-repository"
import { BuscarTarefasConcluidasUseCase } from "../tarefas/buscar-tarefas-concluidas"

export function makeBuscarTarefasConcluidasUseCase() {
  const repository = new MongoTarefaRepository()
  return new BuscarTarefasConcluidasUseCase(repository)
}