export class ErroUsuarioJaExiste extends Error {
  constructor() {
    super('E-mail já está cadastrado.');
  }
}