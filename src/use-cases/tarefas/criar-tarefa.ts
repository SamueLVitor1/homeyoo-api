import { TarefaRepositoryInterface } from "../../repositories/interfaces/tarefa-repository-interface"

interface CriarTarefaExecucaoUseCaseRequest {
  tarefa_id: string,
  house_id: string,
  responsavel_id: string,
  pontuacao: number,
  data_limite: Date
}

interface CriarTarefaExecucaoUseCaseResponse { }

export class CriarTarefaUseCase {
  constructor(private repo: TarefaRepositoryInterface) { }

  async execute(data: CriarTarefaExecucaoUseCaseRequest): Promise<CriarTarefaExecucaoUseCaseResponse> {
    return this.repo.criar(data)
  }
}