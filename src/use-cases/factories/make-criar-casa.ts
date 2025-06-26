import { MongoCasaRepository } from "../../repositories/mongo/casa-repository"
import { MongoUsuariosRepository } from "../../repositories/mongo/usuarios-repository"
import { CriarCasaUseCase } from "../casas/criar-casa"

export function makeCriarCasaUseCase() {
  const casasRepo = new MongoCasaRepository()
  const usuariosRepo = new MongoUsuariosRepository()

  return new CriarCasaUseCase(casasRepo, usuariosRepo)
}
