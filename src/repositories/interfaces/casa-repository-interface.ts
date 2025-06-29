import { CriarCasaDTO } from '../../dto/criar-casa'
import { CasaType } from '../../models/casa'

interface MembroInterface {
  user_id: string
  nome: string
  avatar: string
  papel: 'membro'
}

export interface MembroCasa {
  user_id: string
  nome: string
  papel: 'admin' | 'membro'
  avatar?: string
}

export interface CasaRepositoryInterface {
  criar(data: CriarCasaDTO & { membroAdmin: any }): Promise<CasaType>
  buscarPorCodigo(codigo: string): Promise<CasaType | null>
  adicionarMembro(casaId: string, membro: MembroInterface): Promise<void>
  buscarPorId(id: string): Promise<CasaType | null>
  buscarMembros(idCasa: string): Promise<MembroCasa[] | null>
}