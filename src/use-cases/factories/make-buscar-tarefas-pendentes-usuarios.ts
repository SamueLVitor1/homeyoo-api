import { MongoTarefaRepository } from '../../repositories/mongo/tarefa-repository'
import { BuscarTarefasPendentesUseCase } from '../tarefas/buscar-tarefas-pendentes'


export function makeBuscarTarefasPendentesUseCase() {
  const tarefaRepo = new MongoTarefaRepository()
  return new BuscarTarefasPendentesUseCase(tarefaRepo)
}