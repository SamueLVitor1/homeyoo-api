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
      avatar: avatar ?? '',
      medalhas: medalhasIniciais
    })

    return {
      usuario
    }
  }
}

const medalhasIniciais = [
  {
    nome: "bronze",
    displayName: "Patente Bronze",
    iconeUrl: "https://res.cloudinary.com/dzlxbwggb/image/upload/v1751559563/bronze-medalha-removebg-preview_spkbfi.png",
    pontosNecessarios: 5,
    pontosUsuario: 0,
    habilitado: false,
    dataConquista: null
  },
  {
    nome: "prata",
    displayName: "Patente Prata",
    iconeUrl: "https://res.cloudinary.com/dzlxbwggb/image/upload/v1751559563/prata-medalha-removebg-preview_1_pa66su.png",
    pontosNecessarios: 15,
    pontosUsuario: 0,
    habilitado: false,
    dataConquista: null
  },
  {
    nome: "ouro",
    displayName: "Patente Ouro",
    iconeUrl: "https://res.cloudinary.com/dzlxbwggb/image/upload/v1751559563/ouro-medalha-removebg-preview_w2nyd0.png",
    pontosNecessarios: 30,
    pontosUsuario: 0,
    habilitado: false,
    dataConquista: null
  },
  {
    nome: "diamante",
    displayName: "Patente Diamante",
    iconeUrl: "https://res.cloudinary.com/dzlxbwggb/image/upload/v1751559563/diamante-medalha-removebg-preview_t7baz5.png",
    pontosNecessarios: 50,
    pontosUsuario: 0,
    habilitado: false,
    dataConquista: null
  }
]
