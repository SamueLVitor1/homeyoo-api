import { CasaRepositoryInterface } from '../../repositories/interfaces/casa-repository-interface'
import { CasaType } from '../../models/casa'

interface BuscarCasaIdUseCaseRequest {
  casaId: string
}

interface BuscarCasaIdUseCaseResponse {
  casa: CasaType
}


export class BuscarCasaIdUseCase {
  constructor(
    private casasRepo: CasaRepositoryInterface,
  ) { }

  async execute({ casaId }: BuscarCasaIdUseCaseRequest): Promise<BuscarCasaIdUseCaseResponse> {
    const casa = await this.casasRepo.buscarPorId(casaId)

    if (!casa) {
      throw new Error('Casa não encontrada.')
    }


    return {
      casa
    }
  }
}
