import { TarefaGlobal, TarefaGlobalType } from '../../models/tarefa-global'

export interface TarefaGlobalRepositoryInterface {
  listarTodas(): Promise<TarefaGlobalType[]>
}