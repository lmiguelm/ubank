import { useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext';

export function useAccounts() {
  return useContext(AccountContext);
}
