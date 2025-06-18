import { CasaRepositoryInterface } from '../../repositories/interfaces/casa-repository-interface'
import { UsuariosRepositoryInterface } from '../../repositories/interfaces/usuario-repository-interface'
import { EntrarNaCasaDTO } from '../../dto/entrar-na-casa'

interface EntrarNaCasaRequest {
  codigo: string
  usuarioId: string
}

export class EntrarNaCasaUseCase {
  constructor(
    private casasRepo: CasaRepositoryInterface,
    private usuariosRepo: UsuariosRepositoryInterface
  ) { }

  async execute({ codigo, usuarioId }: EntrarNaCasaRequest): Promise<void> {
    const casa = await this.casasRepo.buscarPorCodigo(codigo)

    const usuario = await this.usuariosRepo.buscarPorId(usuarioId)


    if (!usuario) {
      throw new Error('usuario não encontrada.')
    }

    if (!casa) {
      throw new Error('Casa não encontrada.')
    }

    // Atualiza casa
    await this.casasRepo.adicionarMembro(casa._id.toString(), {
      user_id: usuario.id,
      nome: usuario.nome,
      avatar: usuario.avatar ?? '',
      papel: 'membro'
    })

    // Atualiza usuário
    await this.usuariosRepo.adicionarCasa(usuario.id, {
      house_id: casa._id.toString(),
      papel: 'membro'
    })

    return
  }
}
