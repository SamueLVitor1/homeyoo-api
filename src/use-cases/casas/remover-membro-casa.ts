import { CasaRepositoryInterface } from "../../repositories/interfaces/casa-repository-interface"
import { PontuacaoRepositoryInterface } from "../../repositories/interfaces/pontuacao-repository-interface"
import { TarefaRepositoryInterface } from "../../repositories/interfaces/tarefa-repository-interface"
import { UsuariosRepositoryInterface } from "../../repositories/interfaces/usuario-repository-interface"

interface RemoverMembroCasaRequest {
  casa_id: string
  user_id: string
}

export class RemoverMembroCasaUseCase {
  constructor(
    private casaRepo: CasaRepositoryInterface,
    private tarefaRepo: TarefaRepositoryInterface,
    private pontuacaoRepo: PontuacaoRepositoryInterface,
    private usuarioRepo: UsuariosRepositoryInterface
  ) { }

  async execute({ casa_id, user_id }: RemoverMembroCasaRequest) {
    await this.casaRepo.removerMembro(casa_id, user_id)
    await this.tarefaRepo.deletarPorCasaEUsuarioResponsavel(casa_id, user_id)
    await this.pontuacaoRepo.apagarPontuacaoUsuarioNaCasa(user_id, casa_id)
    await this.usuarioRepo.removerCasaDoUsuario(user_id, casa_id)
  }
}
