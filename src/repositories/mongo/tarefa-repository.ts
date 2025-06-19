import { Tarefa } from '../../models/tarefa'
import { CriarTarefaDTO } from '../../dto/criar-tarefa'
import { TarefaRepositoryInterface } from '../interfaces/tarefa-repository-interface'

export class MongoTarefaRepository implements TarefaRepositoryInterface {
  async criar(data: any) {
    const tarefa = await Tarefa.create(data)
    return tarefa
  }
}
