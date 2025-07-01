import { MongoPontuacaoRepository } from '../../repositories/mongo/pontuacao-repository'
import { BuscarRankingUseCase } from '../pontuacoes/buscar-ranking'

export function makeBuscarRankingUseCase() {
  const pontuacaoRepo = new MongoPontuacaoRepository()
  return new BuscarRankingUseCase(pontuacaoRepo)
}