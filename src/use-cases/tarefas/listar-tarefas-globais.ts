import { console } from 'inspector'
import { TarefaGlobalType } from '../../models/tarefa-global'
import { TarefaGlobalRepositoryInterface } from '../../repositories/interfaces/tarefa-global-repository-interface'

interface ListarTarefasGlobaisUseCaseResponse {
  tarefas: TarefaGlobalType[]
}

export class ListarTarefasGlobaisUseCase {
  constructor(private repo: TarefaGlobalRepositoryInterface) { }

  async execute(): Promise<ListarTarefasGlobaisUseCaseResponse> {
    const tarefas = await this.repo.listarTodas()

    console.log(tarefas)
    return {
      tarefas
    }
  }
}