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
}
