import { PontuacaoType } from "../../models/pontuacao"

export interface PontuacaoRepositoryInterface {
  encontrarPorUsuarioECasa(user_id: string, house_id: string): Promise<PontuacaoType | null>
  criarOuAtualizar(pontuacao: PontuacaoType): Promise<PontuacaoType>
  incrementarPontos(user_id: string, house_id: string, pontos: number): Promise<PontuacaoType>
  buscarPontuacaoAtual(usuarioId: string): Promise<number>
}