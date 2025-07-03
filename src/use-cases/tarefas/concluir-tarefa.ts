import { Usuario } from "../../models/usuario"
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

    // lógica de streak + medalhas
    const user = await Usuario.findById(user_id)
    if (user) {
      let mudouAlgo = false

      // --- Lógica de streak ---
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)

      const ultimoDia = user.ultimoDiaStreak ? new Date(user.ultimoDiaStreak) : null
      if (ultimoDia) ultimoDia.setHours(0, 0, 0, 0)

      let atualizouStreak = false
      let diffDias = 0
      if (ultimoDia) {
        diffDias = Math.floor((hoje.getTime() - ultimoDia.getTime()) / (1000 * 60 * 60 * 24))
      }

      if (!ultimoDia) {
        user.streakAtual = 1
        user.ultimoDiaStreak = hoje
        atualizouStreak = true
      } else if (diffDias === 1) {
        user.streakAtual = (user.streakAtual || 0) + 1
        user.ultimoDiaStreak = hoje
        atualizouStreak = true
      } else if (diffDias > 1) {
        user.streakAtual = 1
        user.ultimoDiaStreak = hoje
        atualizouStreak = true
      }
      // Se diffDias === 0, não faz nada

      if (atualizouStreak) {
        if (!user.maiorStreak || user.streakAtual > user.maiorStreak) {
          user.maiorStreak = user.streakAtual
        }
        mudouAlgo = true
      }

      // --- Lógica de medalhas ---
      const mudouMedalha = atualizarMedalhas(user)
      if (mudouMedalha) {
        mudouAlgo = true
      }

      if (mudouAlgo) {
        await user.save()
      }
    }

    return tarefaAtualizada
  }
}

function atualizarMedalhas(user: any) {
  if (!user.medalhas) return false

  let mudouAlgo = false

  user.medalhas.forEach((medalha: any) => {
    // Se ainda não está habilitada, verifica progresso
    if (!medalha.habilitado) {
      // Incrementa pontos
      medalha.pontosUsuario = (medalha.pontosUsuario || 0) + 1

      // Se atingiu meta, habilita e salva data
      if (medalha.pontosUsuario >= medalha.pontosNecessarios) {
        medalha.habilitado = true
        medalha.dataConquista = new Date()
      }
      mudouAlgo = true
    }
  })

  return mudouAlgo
}
