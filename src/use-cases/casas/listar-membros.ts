import { CasaRepositoryInterface } from '../../repositories/interfaces/casa-repository-interface'

interface ListarMembrosRequest {
  house_id: string
}

export class ListarMembrosCasaUseCase {
  constructor(private casasRepository: CasaRepositoryInterface) { }

  async execute({ house_id }: ListarMembrosRequest) {
    const membros = await this.casasRepository.buscarMembros(house_id)
    return membros
  }
}
