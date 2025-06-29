import { CasaType } from "../../models/casa"
import { CasaRepositoryInterface } from "../../repositories/interfaces/casa-repository-interface"
import { UsuariosRepositoryInterface } from "../../repositories/interfaces/usuario-repository-interface"

interface BuscarCasaDoUsuarioUseCaseRequest {
  usuarioId: string
}

interface BuscarCasaDoUsuarioUseCaseResponse {
  casa: CasaType
}

export class BuscarCasaDoUsuarioUseCase {
  constructor(
    private usuariosRepository: UsuariosRepositoryInterface,
    private casasRepository: CasaRepositoryInterface
  ) { }

  async execute({ usuarioId }: BuscarCasaDoUsuarioUseCaseRequest): Promise<BuscarCasaDoUsuarioUseCaseResponse> {

    const usuario = await this.usuariosRepository.buscarPorId(usuarioId)

    if (!usuario) {
      throw new Error("Usuário não encontrado")
    }

    const casaId = usuario.casas?.[0]?.house_id

    if (!casaId) throw new Error("Usuário não está em uma casa")

    const casa = await this.casasRepository.buscarPorId(casaId)
    if (!casa) {
      throw new Error("Casa não encontrada")
    }

    return {
      casa
    }
  }
}
