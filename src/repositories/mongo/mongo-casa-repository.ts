import { CasasRepositoryInterface, CriarCasaDTO } from '../casa-repository-interface'
import { Casa, CasaModel } from '../../models/casa.model'

export class MongoCasaRepository implements CasasRepositoryInterface {
  async create(data: CriarCasaDTO) {
    const casa = await CasaModel.create(data)
    return casa.toObject()
  }

  buscarPorId(id: string): Promise<Casa | null> {
    return CasaModel.findById(id).lean();
  }
  buscarPorCodigo(codigo: string): Promise<Casa | null> {
    return CasaModel.findOne({ codigo_convite: codigo }).lean();
  }

}