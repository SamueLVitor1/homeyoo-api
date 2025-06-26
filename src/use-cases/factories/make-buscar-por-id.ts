import { MongoCasaRepository } from "../../repositories/mongo/casa-repository"
import { BuscarCasaIdUseCase } from "../casas/buscar-por-id"

export function makeBuscarCasaIdUseCase() {
  const casaRepo = new MongoCasaRepository()
  return new BuscarCasaIdUseCase(casaRepo)
}