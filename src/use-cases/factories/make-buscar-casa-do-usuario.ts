import { MongoCasaRepository } from "../../repositories/mongo/casa-repository"
import { MongoUsuariosRepository } from "../../repositories/mongo/usuarios-repository"
import { BuscarCasaDoUsuarioUseCase } from "../usuarios/buscar-casa-do-usuario"

export function makeBuscarCasaDoUsuarioCase() {
  const casaRepo = new MongoCasaRepository()
  const usuarioRepo = new MongoUsuariosRepository()
  return new BuscarCasaDoUsuarioUseCase(usuarioRepo, casaRepo)
}