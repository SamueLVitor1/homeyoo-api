import { CasaRepositoryInterface } from "../../repositories/interfaces/casa-repository-interface"

interface AtualizarCasaRequest {
  casa_id: string
  nome?: string
  metaAtual?: number
}

export class AtualizarCasaUseCase {
  constructor(private repo: CasaRepositoryInterface) { }

  async execute({ casa_id, nome, metaAtual }: AtualizarCasaRequest): Promise<void> {
    const dataToUpdate: any = {}
    if (nome) dataToUpdate.nome = nome
    if (metaAtual !== undefined) dataToUpdate.metaAtual = metaAtual
    if (Object.keys(dataToUpdate).length === 0) return

    await this.repo.atualizarCasa(casa_id, dataToUpdate)
  }
}
