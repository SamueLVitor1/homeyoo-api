import { MongoCasaRepository } from '../../repositories/mongo/casa-repository'
import { AtualizarCasaUseCase } from '../casas/atualizar-casa'

export function makeAtualizarCasaUseCase() {
  const repo = new MongoCasaRepository()
  return new AtualizarCasaUseCase(repo)
}