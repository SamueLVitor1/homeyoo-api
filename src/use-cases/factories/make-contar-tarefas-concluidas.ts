
import { MongoTarefaRepository } from "../../repositories/mongo/tarefa-repository"
import { ContarTarefasConcluidasUseCase } from "../tarefas/contar-tarefas-concluidas"

export function makeContarTarefasConcluidasUseCase() {
  const repository = new MongoTarefaRepository()
  return new ContarTarefasConcluidasUseCase(repository)
}