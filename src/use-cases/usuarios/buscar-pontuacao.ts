import { PontuacaoRepositoryInterface } from "../../repositories/interfaces/pontuacao-repository-interface"

interface BuscarPontuacaoUseCaseRequest {
  usuarioId: string
}

export class BuscarPontuacaoUseCase {
  constructor(private pontuacaoRepository: PontuacaoRepositoryInterface) { }

  async execute({ usuarioId }: BuscarPontuacaoUseCaseRequest): Promise<number> {
    const pontuacao = await this.pontuacaoRepository.buscarPontuacaoAtual(usuarioId)
    return pontuacao
  }
}
