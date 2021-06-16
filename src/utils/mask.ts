export function unmaskCpf(cpf: string): number {
  const result = cpf.replace(/\.|-/gm, '');
  return Number(result);
}
