import { UsuariosRepositoryInterface, CriarUsuarioDTO } from '../usuario-repository-interface'
import { Usuario, UsuarioModel } from '../../models/usuario.model'

export class MongoUsuariosRepository implements UsuariosRepositoryInterface {


  async create(data: CriarUsuarioDTO) {
    const user = await UsuarioModel.create(data)
    return user.toObject()
  }

  async buscarPorEmail(email: string) {
    const user = await UsuarioModel.findOne({
      email: email
    }).lean()

    return user || null;
  }

}