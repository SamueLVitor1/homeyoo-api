
import { Pontuacao, PontuacaoType } from '../../models/pontuacao';
import { PontuacaoRepositoryInterface } from '../interfaces/pontuacao-repository-interface'

export class MongoPontuacaoRepository implements PontuacaoRepositoryInterface {
  async encontrarPorUsuarioECasa(user_id: string, house_id: string) {
    return await Pontuacao.findOne({ user_id, house_id })
  }
  async criarOuAtualizar(pontuacao: PontuacaoType) {
    return await Pontuacao.findOneAndUpdate(
      { user_id: pontuacao.user_id, house_id: pontuacao.house_id },
      { $set: pontuacao },
      { upsert: true, new: true }
    )
  }
  async incrementarPontos(user_id: string, house_id: string, pontos: number) {
    return await Pontuacao.findOneAndUpdate(
      { user_id, house_id },
      {
        $inc: { pontos },
        $set: { data_atualizacao: new Date() }
      },
      { upsert: true, new: true }
    )
  }

  async buscarPontuacaoAtual(usuarioId: string): Promise<number> {
    const registro = await Pontuacao.findOne({ user_id: usuarioId })
    return registro?.pontos ?? 0
  }

  async buscarRankingPorCasa(houseId: string) {
    const ranking = await Pontuacao.find({ house_id: houseId })
      .select('user_id pontos -_id') // seleciona apenas user_id e pontos, omite o _id
      .sort({ pontos: -1 }) // ordena por pontuação decrescente
      .lean()

    return ranking.map(item => ({
      user_id: item.user_id,
      pontos: item.pontos,
    }))
  }

}
