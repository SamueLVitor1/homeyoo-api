import { hash } from 'bcryptjs'
import { UsuariosRepositoryInterface } from '../../repositories/interfaces/usuario-repository-interface'
import { UsuarioType } from '../../models/usuario'

interface CreateUsuarioUseCaseRequest {
  nome: string
  email: string
  senha: string
  avatar?: string
}

interface CreateUsuarioUseCaseResponse {
  usuario: UsuarioType
}

export class CriarUsuarioUseCase {
  constructor(private usuariosRepository: UsuariosRepositoryInterface) { }

  async execute({ nome, senha, avatar, email }: CreateUsuarioUseCaseRequest): Promise<CreateUsuarioUseCaseResponse> {

    const usuarioExistente = await this.usuariosRepository.buscarPorEmail(email)
    if (usuarioExistente) {
      throw new Error('E-mail já cadastrado.')
    }

    const senha_hash = await hash(senha, 8)

    const usuario = await this.usuariosRepository.criar({
      nome,
      email,
      senha_hash,
      avatar: avatar ?? ''
    })

    return {
      usuario
    }
  }
}
