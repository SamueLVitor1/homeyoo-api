import { Casa } from '../../models/casa'
import { CriarCasaDTO } from '../../dto/criar-casa'
import { CasaRepositoryInterface } from '../interfaces/casa-repository-interface'

export class MongoCasaRepository implements CasaRepositoryInterface {
  async criar(data: CriarCasaDTO & { membroAdmin: any }) {
    const novaCasa = await Casa.create({
      nome: data.nome,
      codigo: data.codigo,
      membros: [data.membroAdmin]
    })
    return novaCasa
  }

  async buscarPorCodigo(codigo: string) {
    return Casa.findOne({ codigo })
  }

  async adicionarMembro(casaId: string, membro: {
    user_id: string
    nome: string
    avatar: string
    papel: 'membro'
  }) {
    await Casa.updateOne(
      { _id: casaId },
      { $push: { membros: membro } }
    )
  }

  async buscarPorId(id: string) {
    return Casa.findById(id)
  }

}
