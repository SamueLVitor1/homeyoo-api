import { TarefaRepositoryInterface } from "../../repositories/interfaces/tarefa-repository-interface"

interface ContarTarefasPendentesUseCaseRequest {
  usuarioId: string
}

export class ContarTarefasPendentesUseCase {
  constructor(private tarefasRepository: TarefaRepositoryInterface) { }

  async execute({ usuarioId }: ContarTarefasPendentesUseCaseRequest): Promise<number> {
    const tarefasPendentes = await this.tarefasRepository.buscarPorUsuarioEStatus(usuarioId, 'pendente')
    return tarefasPendentes.length
  }
}