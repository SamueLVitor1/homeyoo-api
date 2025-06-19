import { TarefaType } from '../../models/tarefa'
import { TarefaRepositoryInterface } from '../../repositories/interfaces/tarefa-repository-interface'

interface ListarTarefasPorCasaUseCaseRequest {
  house_id: string
}

interface ListarTarefasPorCasaUseCaseResponse {
  tarefas: TarefaType[]
}

export class ListarTarefasPorCasaUseCase {
  constructor(private repo: TarefaRepositoryInterface) { }

  async execute({ house_id }: ListarTarefasPorCasaUseCaseRequest): Promise<ListarTarefasPorCasaUseCaseResponse> {
    const tarefas = await this.repo.listarPorCasa(house_id)
    return { tarefas }
  }
}