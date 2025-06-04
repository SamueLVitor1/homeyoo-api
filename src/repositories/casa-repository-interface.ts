import { Casa } from "../models/casa.model";

export interface MembroCasa {
  user_id: string;
  nome: string;
  papel: 'admin' | 'membro';
  avatar?: string;
}

export interface CriarCasaDTO {
  nome: string;
  membros: MembroCasa[];
  codigo_convite: string;
}

export interface CasasRepositoryInterface {
  create(data: CriarCasaDTO): Promise<Casa>;
  buscarPorId(id: string): Promise<Casa | null>;
  buscarPorCodigo(codigo: string): Promise<Casa | null>;
}