import { TarefaRepositoryInterface } from "../../repositories/interfaces/tarefa-repository-interface"

interface BuscarTarefasConcluidasUseCaseRequest {
  usuarioId: string
}

export class BuscarTarefasConcluidasUseCase {
  constructor(private tarefasRepository: TarefaRepositoryInterface) { }

  async execute({ usuarioId }: BuscarTarefasConcluidasUseCaseRequest): Promise<number> {
    const tarefasConcluidas = await this.tarefasRepository.buscarPorUsuarioEStatus(usuarioId, 'concluida')

    console.log(tarefasConcluidas)
    console.log(usuarioId)
    return tarefasConcluidas.length
  }
}