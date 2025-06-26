import { PontuacaoRepositoryInterface } from "../../repositories/interfaces/pontuacao-repository-interface"
import { TarefaRepositoryInterface } from "../../repositories/interfaces/tarefa-repository-interface"
import { Types } from 'mongoose'

interface ConcluirTarefaRequest {
  tarefa_id: string
  user_id: string
  house_id: string
}

export class ConcluirTarefaUseCase {
  constructor(
    private tarefaRepository: TarefaRepositoryInterface,
    private pontuacaoRepository: PontuacaoRepositoryInterface
  ) { }

  async execute({ tarefa_id, user_id, house_id }: ConcluirTarefaRequest) {
    const tarefa = await this.tarefaRepository.buscarPorId(tarefa_id)

    if (!tarefa) {
      throw new Error('Tarefa não encontrada.')
    }

    if (tarefa.house_id !== house_id) {
      throw new Error('Tarefa não pertence a essa casa.')
    }

    if (tarefa.status === 'concluida') {
      throw new Error('Tarefa já está concluída.')
    }

    tarefa.status = 'concluida'
    tarefa.data_conclusao = new Date()

    const tarefaAtualizada = await this.tarefaRepository.atualizar({
      ...tarefa.toObject(),
      _id: tarefa._id.toString() as unknown as Types.ObjectId & string
    })

    await this.pontuacaoRepository.incrementarPontos(user_id, house_id, tarefa.pontuacao)

    return tarefaAtualizada
  }
}

