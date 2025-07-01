import { PontuacaoRepositoryInterface } from '../../repositories/interfaces/pontuacao-repository-interface'

interface BuscarRankingRequest {
  houseId: string
}

interface UsuarioRankeado {
  user_id: string
  pontos: number
}

export class BuscarRankingUseCase {
  constructor(private pontuacaoRepository: PontuacaoRepositoryInterface) {}

  async execute({ houseId }: BuscarRankingRequest): Promise<UsuarioRankeado[]> {
    const ranking = await this.pontuacaoRepository.buscarRankingPorCasa(houseId)

    return ranking
  }
}
