import { CriarUsuarioDTO } from '../../dto/criar-usuario'
import { UsuarioType } from '../../models/usuario'

export interface UsuariosRepositoryInterface {
  criar(data: CriarUsuarioDTO): Promise<UsuarioType>
  buscarPorEmail(email: string): Promise<UsuarioType | null>
  adicionarCasa(userId: string, dados: { house_id: string, papel: string }): Promise<void>
  buscarPorId(id: string): Promise<UsuarioType | null>
}
