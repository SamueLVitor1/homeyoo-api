
import { UsuarioType } from "../../models/usuario"
import { UsuariosRepositoryInterface } from "../../repositories/interfaces/usuario-repository-interface"

interface BuscarPerfilUseCaseRequest {
  usuarioId: string
}



export class BuscarPerfilUseCase {
  constructor(private usuariosRepository: UsuariosRepositoryInterface) { }

  async execute({ usuarioId }: BuscarPerfilUseCaseRequest) {
    const usuario = await this.usuariosRepository.buscarPorId(usuarioId)
    return usuario
  }
}