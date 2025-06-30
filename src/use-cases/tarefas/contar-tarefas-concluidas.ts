import { TarefaRepositoryInterface } from "../../repositories/interfaces/tarefa-repository-interface"

interface ContarTarefasConcluidasUseCaseRequest {
  usuarioId: string
}

export class ContarTarefasConcluidasUseCase {
  constructor(private tarefasRepository: TarefaRepositoryInterface) { }

  async execute({ usuarioId }: ContarTarefasConcluidasUseCaseRequest): Promise<number> {
    const tarefasConcluidas = await this.tarefasRepository.buscarPorUsuarioEStatus(usuarioId, 'concluida')

    console.log(tarefasConcluidas)
    console.log(usuarioId)
    return tarefasConcluidas.length
  }
}