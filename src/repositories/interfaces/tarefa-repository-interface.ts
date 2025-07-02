import { CriarTarefaDTO } from '../../dto/criar-tarefa'
import { TarefaType, } from '../../models/tarefa'

export interface TarefaRepositoryInterface {
  criar(data: CriarTarefaDTO): Promise<TarefaType>
  listarPorCasa(house_id: string, status?: string): Promise<TarefaType[]>
  buscarPorId(id: string): Promise<TarefaType | null>
  atualizar(data: Partial<TarefaType> & { _id: string }): Promise<TarefaType>
  buscarPorUsuarioEStatus(usuarioId: string, status: string): Promise<TarefaType[]>
  buscarPendentesPorUsuario(userId: string): Promise<TarefaType[]>
  deletarPorCasaEUsuarioResponsavel(casaId: string, userId: string): Promise<void>
}
