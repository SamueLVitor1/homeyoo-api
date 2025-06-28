
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
}
