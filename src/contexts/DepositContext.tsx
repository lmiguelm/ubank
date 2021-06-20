import React, { useState, createContext, ReactNode } from 'react';
import { useAccounts } from '../hooks/useAccounts';

import { api } from '../services/api';
import { IAccountData } from '../types/IAccount';

import { IDepositData } from '../types/IDeposit';
import { formatDate } from '../utils/date';
import { unmaskmMoney } from '../utils/money';

interface IDepositContext {
  filteredDeposits: IDepositData[];
  loadedDeposits: boolean;
  loadDeposits: (accountId: string) => Promise<void>;
  newDepoist: (deposit: IDepositData, account: IAccountData) => Promise<void>;
  filterDepositts: (filter: string) => void;
  refreshFilteredDeposits: () => void;
}

export const DepositContext = createContext({} as IDepositContext);

interface IDepositProps {
  children: ReactNode;
}

export function DepositProvider({ children }: IDepositProps) {
  const { editAccount } = useAccounts();

  const [deposits, setDeposits] = useState<IDepositData[]>([]);
  const [filteredDeposits, setFilteredDeposits] = useState<IDepositData[]>([]);
  const [loadedDeposits, setLoadedDeposits] = useState<boolean>(true);

  async function loadDeposits(accountId: string) {
    setLoadedDeposits(false);
    const { data } = await api.get<IDepositData[]>(`/deposits`, {
      params: { accountId, _sort: 'createdAt', _order: 'desc' },
    });
    setDeposits(data);
    setFilteredDeposits(data);
    setLoadedDeposits(true);
  }

  async function newDepoist(deposit: IDepositData, account: IAccountData) {
    try {
      setLoadedDeposits(false);
      await api.post('/deposits', deposit);

      const newDepositArray = [...deposits, deposit];

      setFilteredDeposits(newDepositArray);
      setDeposits(newDepositArray);

      await editAccount({ ...account, balance: account.balance + deposit.value });
    } catch {
      throw new Error('Não foi possível realizar este depósito');
    } finally {
      setLoadedDeposits(true);
    }
  }

  function filterDepositts(filter: string) {
    const filteredDeposits = deposits.filter((deposit) => {
      if (formatDate(Number(filter)) === formatDate(deposit.createdAt)) {
        return deposit;
      }
    });

    setFilteredDeposits(filteredDeposits);
  }

  function refreshFilteredDeposits() {
    setFilteredDeposits(deposits);
  }

  return (
    <DepositContext.Provider
      value={{
        refreshFilteredDeposits,
        filterDepositts,
        filteredDeposits,
        loadDeposits,
        loadedDeposits,
        newDepoist,
      }}
    >
      {children}
    </DepositContext.Provider>
  );
}
