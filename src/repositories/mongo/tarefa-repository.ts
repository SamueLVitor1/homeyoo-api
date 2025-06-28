import { Tarefa, TarefaType } from '../../models/tarefa'
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

  async buscarPorId(id: string) {
    return await Tarefa.findById(id)
  }

  async atualizar(data: Partial<TarefaType> & { _id: string }) {
    const { _id, ...resto } = data
    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(_id, resto, {
      new: true
    })

    return tarefaAtualizada as TarefaType
  }

  async buscarPorUsuarioEStatus(usuarioId: string, status: string): Promise<TarefaType[]> {
    return await Tarefa.find({ usuarioId, status })
  }
}
