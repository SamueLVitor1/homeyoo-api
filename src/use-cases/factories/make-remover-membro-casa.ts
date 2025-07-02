import { MongoCasaRepository } from "../../repositories/mongo/casa-repository";
import { MongoPontuacaoRepository } from "../../repositories/mongo/pontuacao-repository";
import { MongoTarefaRepository } from "../../repositories/mongo/tarefa-repository";
import { MongoUsuariosRepository } from "../../repositories/mongo/usuarios-repository";
import { RemoverMembroCasaUseCase } from "../casas/remover-membro-casa";


export function makeRemoverMembroCasaUseCase() {
  return new RemoverMembroCasaUseCase(
    new MongoCasaRepository(),
    new MongoTarefaRepository(),
    new MongoPontuacaoRepository(),
    new MongoUsuariosRepository()
  )
}
