import { MaskService } from 'react-native-masked-text';

export function unmaskCpf(cpf: string): number {
  const result = cpf.replace(/\.|-/gm, '');
  return Number(result);
}

export function unmaskmMoney(balance: string): number {
  const result = MaskService.toRawValue('money', balance, { maskType: 'BRL' });
  return Number(result);
}
