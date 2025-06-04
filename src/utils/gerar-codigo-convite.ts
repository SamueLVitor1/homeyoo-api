export function gerarCodigoConvite(tamanho = 6): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < tamanho; i++) {
    const index = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[index];
  }
  return codigo;
}