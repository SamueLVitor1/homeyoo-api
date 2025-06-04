import { Casa } from "../../models/casa.model";
import { CasasRepositoryInterface } from "../../repositories/casa-repository-interface";

interface BuscarCasaPorCodigoUseCaseRequest {
  codigo: string;
}

interface BuscarCasaPorCodigoUseCaseResponse {
  casa: Casa | null;
}

export class BuscarCasaPorCodigoUseCase {

  constructor(
    private casasRepository: CasasRepositoryInterface
  ) { }

  async execute({ codigo }: BuscarCasaPorCodigoUseCaseRequest) {
    const casa = await this.casasRepository.buscarPorCodigo(codigo)

    return {
      casa
    }
  }

}