import { TarefaGlobal } from '../../models/tarefa-global'
import { TarefaGlobalRepositoryInterface } from '../interfaces/tarefa-global-repository-interface'

export class MongoTarefaGlobalRepository implements TarefaGlobalRepositoryInterface {
  async listarTodas() {
    return TarefaGlobal.find().sort({ nome: 1 }) // ordena por nome
  }
}