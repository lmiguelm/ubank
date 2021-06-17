export function unmaskCpf(cpf: string): number {
  const result = cpf.replace(/\.|-/gm, '');
  return Number(result);
}

export function unmaskmMoney(balance: string): number {
  const result = balance.replace(/[^0-9,]*/g, '').replace(',', '.');
  return Number(result);
}
