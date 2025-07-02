import { Tarefa, TarefaType } from '../../models/tarefa'
import { CriarTarefaDTO } from '../../dto/criar-tarefa'
import { TarefaRepositoryInterface } from '../interfaces/tarefa-repository-interface'

export class MongoTarefaRepository implements TarefaRepositoryInterface {
  async criar(data: any) {
    const tarefa = await Tarefa.create(data)
    return tarefa
  }

  async listarPorCasa(house_id: string, status?: string) {
    const filter: any = { house_id }
    if (status) filter.status = status

    return Tarefa.find(filter)
      .populate('tarefa_id', 'nome')
      .populate('responsavel_id', 'nome avatar')
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
    return await Tarefa.find({ responsavel_id: usuarioId, status })
  }

  async buscarPendentesPorUsuario(userId: string, limit = 3): Promise<TarefaType[]> {
    return Tarefa.find({
      responsavel_id: userId,
      status: 'pendente'
    }).populate('tarefa_id').sort({ data_limite: 1 }).limit(limit)
  }

  async deletarPorCasaEUsuarioResponsavel(casaId: string, userId: string) {
    await Tarefa.deleteMany({ house_id: casaId, responsavel_id: userId })
  }

}
