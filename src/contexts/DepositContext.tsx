import React, { useState, createContext, ReactNode } from 'react';

import { api } from '../services/api';

import { IDepositData } from '../types/IDeposit';
import { formatDate } from '../utils/date';

interface IDepositContext {
  filteredDeposits: IDepositData[];
  loadedDeposits: boolean;
  loadDeposits: (accountId: string) => void;
  newDepoist: (deposit: IDepositData) => void;
  filterDepositts: (filter: string) => void;
  refreshFilteredDeposits: () => void;
}

export const DepositContext = createContext({} as IDepositContext);

interface IDepositProps {
  children: ReactNode;
}

export function DepositProvider({ children }: IDepositProps) {
  const [deposits, setDeposits] = useState<IDepositData[]>([]);
  const [filteredDeposits, setFilteredDeposits] = useState<IDepositData[]>([]);
  const [loadedDeposits, setLoadedDeposits] = useState<boolean>(false);

  async function loadDeposits(accountId: string) {
    setLoadedDeposits(false);
    const { data } = await api.get<IDepositData[]>(`/deposits`, {
      params: { accountId, _sort: 'createdAt', _order: 'desc' },
    });
    setDeposits(data);
    setFilteredDeposits(data);
    setLoadedDeposits(true);
  }

  async function newDepoist(deposit: IDepositData) {
    try {
      setLoadedDeposits(false);
      await api.post('/deposits', deposit);

      const newDepositArray = [...deposits, deposit];

      setFilteredDeposits(newDepositArray);
      setDeposits(newDepositArray);
    } catch {
      throw new Error('Não foi possível cadastrar este depósito');
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
