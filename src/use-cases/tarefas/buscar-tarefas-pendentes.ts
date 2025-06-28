import { TarefaRepositoryInterface } from "../../repositories/interfaces/tarefa-repository-interface"

interface BuscarTarefasPendentesUseCaseRequest {
  usuarioId: string
}

export class BuscarTarefasPendentesUseCase {
  constructor(private tarefasRepository: TarefaRepositoryInterface) { }

  async execute({ usuarioId }: BuscarTarefasPendentesUseCaseRequest): Promise<number> {
    const tarefasPendentes = await this.tarefasRepository.buscarPorUsuarioEStatus(usuarioId, 'pendente')
    return tarefasPendentes.length
  }
}