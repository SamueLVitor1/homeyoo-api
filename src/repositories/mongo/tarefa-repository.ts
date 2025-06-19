import { Tarefa } from '../../models/tarefa'
import { CriarTarefaDTO } from '../../dto/criar-tarefa'
import { TarefaRepositoryInterface } from '../interfaces/tarefa-repository-interface'

export class MongoTarefaRepository implements TarefaRepositoryInterface {
  async criar(data: any) {
    const tarefa = await Tarefa.create(data)
    return tarefa
  }

  async listarPorCasa(house_id: string) {
    return Tarefa.find({ house_id })
      .populate('tarefa_id', 'nome') // pega nome da tarefa
      .populate('responsavel_id', 'nome avatar') // pega nome e avatar do usuário
  }
}
