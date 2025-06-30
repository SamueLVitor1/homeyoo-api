import { TarefaRepositoryInterface } from '../../repositories/interfaces/tarefa-repository-interface'
import { TarefaType } from '../../models/tarefa'

interface BuscarTarefasPendentesRequest {
  userId: string
}

export class BuscarTarefasPendentesUseCase {
  constructor(private tarefaRepository: TarefaRepositoryInterface) { }

  async execute({ userId }: BuscarTarefasPendentesRequest): Promise<TarefaType[]> {
    return this.tarefaRepository.buscarPendentesPorUsuario(userId)
  }
}