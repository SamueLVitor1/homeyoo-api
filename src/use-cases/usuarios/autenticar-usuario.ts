import { compare } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { UsuariosRepositoryInterface } from '../../repositories/interfaces/usuario-repository-interface'
import { LoginUsuarioDTO } from '../../dto/login-usuario'
import { UsuarioType } from '../../models/usuario'

interface AutenticarUsuarioRequest {
  email: string
  senha: string
}

interface AutenticarUsuarioResponse {
  token: string
  usuario: UsuarioType
}

export class AutenticarUsuarioUseCase {
  constructor(
    private usuariosRepository: UsuariosRepositoryInterface,
    private fastify: FastifyInstance
  ) { }

  async execute({ email, senha }: AutenticarUsuarioRequest): Promise<AutenticarUsuarioResponse> {
    const usuario = await this.usuariosRepository.buscarPorEmail(email)

    if (!usuario) {
      throw new Error('E-mail ou senha inválidos.')
    }

    const senhaCorreta = await compare(senha, usuario.senha_hash)

    if (!senhaCorreta) {
      throw new Error('E-mail ou senha inválidos.')
    }

    const token = this.fastify.jwt.sign(
      { sub: usuario._id.toString() },
      { expiresIn: '7d' }
    )

    return { token, usuario }
  }
}
