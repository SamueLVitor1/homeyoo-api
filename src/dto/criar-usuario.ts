import { z } from 'zod'

export interface CriarUsuarioDTO {
  nome: string,
  email: string,
  senha_hash: string,
  avatar: string
}

