import { Usuario } from "../models/usuario.model"

export interface UsuarioCasa {
  house_id?: string
  papel: 'admin' | 'membro'
}

export interface CriarUsuarioDTO {
  nome: string
  email: string
  senha_hash: string
  avatar?: string
  casas?: UsuarioCasa[]
}

export interface UsuariosRepositoryInterface {
  create(data: CriarUsuarioDTO): Promise<Usuario>
  buscarPorEmail(email: string): Promise<Usuario | null>
}