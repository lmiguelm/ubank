import { useContext } from 'react';
import { DepositContext } from '../contexts/DepositContext';

export function useDeposits() {
  return useContext(DepositContext);
}
