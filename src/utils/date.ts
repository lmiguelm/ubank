import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(date: number): string {
  return format(date, 'dd/MM/yyyy', { locale: ptBR });
}

export function formatDateWithHours(date: number) {
  return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
}
