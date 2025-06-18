import { CriarCasaDTO } from '../../dto/criar-casa'
import { CasaType } from '../../models/casa'

export interface CasaRepositoryInterface {
  criar(data: CriarCasaDTO & { membroAdmin: any }): Promise<CasaType>
}