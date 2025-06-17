import { Usuario } from '../../models/usuario'
import { CriarUsuarioDTO } from '../../dto/criar-usuario' 
import { UsuariosRepositoryInterface } from '../interfaces/usuario-repository-interface'

export class MongoUsuariosRepository implements UsuariosRepositoryInterface {
  async criar(data: CriarUsuarioDTO & { senha_hash: string }) {
    return Usuario.create(data)
  }

  async buscarPorEmail(email: string) {
    return Usuario.findOne({ email })
  }
}
