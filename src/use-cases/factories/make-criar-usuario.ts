import { MongoUsuariosRepository } from "../../repositories/mongo/usuarios-repository"
import { CriarUsuarioUseCase } from "../usuarios/criar-usuario"

export function makeCriarUsuarioUseCase() {
  const usuariosRepository = new MongoUsuariosRepository()

  return new CriarUsuarioUseCase(usuariosRepository)
}
