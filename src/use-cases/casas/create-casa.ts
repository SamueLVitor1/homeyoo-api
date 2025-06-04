import { CasasRepositoryInterface, CriarCasaDTO } from "../../repositories/casa-repository-interface";
import { Casa } from "../../models/casa.model";
import { gerarCodigoConvite } from "../../utils/gerar-codigo-convite";

interface CreateCasaUseCaseRequest extends Omit<CriarCasaDTO, 'codigo_convite'> {}

interface CreateCasaUseCaseResponse {
  casa: Casa;
}

export class CreateCasaUseCase {
  constructor(
    private casasRepository: CasasRepositoryInterface
  ) { }

  async execute(request: CreateCasaUseCaseRequest): Promise<CreateCasaUseCaseResponse> {
    const { nome, membros } = request


    let codigo: string;
    let casaExistente: Casa | null;

    do {
      codigo = gerarCodigoConvite();
      casaExistente = await this.casasRepository.buscarPorCodigo(codigo);
    } while (casaExistente);

    const casa = await this.casasRepository.create({
      nome,
      membros,
      codigo_convite: codigo
    })


    return {
      casa
    }
  }
}
