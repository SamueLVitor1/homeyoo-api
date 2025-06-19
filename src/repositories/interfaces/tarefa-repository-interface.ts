import { CriarTarefaDTO } from '../../dto/criar-tarefa'
import { TarefaType, } from '../../models/tarefa'

export interface TarefaRepositoryInterface {
  criar(data: CriarTarefaDTO): Promise<TarefaType>
}
