import { randomUUID } from 'crypto'
import { CasaType } from '../../models/casa'
import { CasaRepositoryInterface } from '../../repositories/interfaces/casa-repository-interface'
import { UsuariosRepositoryInterface } from '../../repositories/interfaces/usuario-repository-interface'

interface CriarCasaRequest {
  nome: string
  usuario: {
    id: string
    nome: string
    avatar: string
  }
}

interface CriarCasaResponse {
  casa: CasaType
}


export class CriarCasaUseCase {
  constructor(
    private casaRepository: CasaRepositoryInterface,
    private usuariosRepository: UsuariosRepositoryInterface
  ) { }

  async execute({ nome, usuario }: CriarCasaRequest): Promise<CriarCasaResponse> {
    const codigo = randomUUID().slice(0, 6).toUpperCase()

    const casa = await this.casaRepository.criar({
      nome,
      codigo,
      membroAdmin: {
        user_id: usuario.id,
        nome: usuario.nome,
        papel: 'admin',
        avatar: usuario.avatar
      }
    })

    await this.usuariosRepository.adicionarCasa(usuario.id, {
      house_id: casa._id.toString(),
      papel: 'admin'
    })

    return { casa }
  }
}
