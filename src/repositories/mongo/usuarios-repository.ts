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

  async adicionarCasa(userId: string, dados: { house_id: string, papel: 'admin' | 'membro' }) {
    await Usuario.updateOne(
      { _id: userId },
      { $push: { casas: dados } }
    )
  }

  async buscarPorId(id: string) {
    return Usuario.findById(id)
  }

  async removerCasaDoUsuario(userId: string, casaId: string) {
    await Usuario.findByIdAndUpdate(userId, {
      $pull: { casas: { house_id: casaId } }
    })
  }
}
