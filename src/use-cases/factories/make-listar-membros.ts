import { MongoCasaRepository } from "../../repositories/mongo/casa-repository"
import { MongoUsuariosRepository } from "../../repositories/mongo/usuarios-repository"
import { ListarMembrosCasaUseCase } from "../casas/listar-membros"
import { CriarUsuarioUseCase } from "../usuarios/criar-usuario"

export function makeListarMembrosUseCase() {
  const casaRepo = new MongoCasaRepository()

  return new ListarMembrosCasaUseCase(casaRepo)
}
