import { MaskService } from 'react-native-masked-text';

export function formatMoney(value: number) {
  return MaskService.toMask('money', String(value), {
    maskType: 'BRL',
  });
}

export function formatMoneyWhitoutR$(value: number) {
  return MaskService.toMask('money', String(value), {
    maskType: 'BRL',
    unit: '',
  });
}
