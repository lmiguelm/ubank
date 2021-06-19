import React, { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { api } from '../services/api';
import { IDepositData } from '../types/IDeposit';

interface IDepositContext {
  filteredDeposits: IDepositData[];
  loadedDeposits: boolean;
  loadDeposits: (accountId: string) => void;
  newDepoist: (deposit: IDepositData) => void;
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

  return (
    <DepositContext.Provider
      value={{
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
