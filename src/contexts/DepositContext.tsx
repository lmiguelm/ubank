import React, { useState, createContext, ReactNode } from 'react';
import { useCallback } from 'react';
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
  newDeposit: (deposit: IDepositData, account: IAccountData) => Promise<void>;
  filterDeposits: (filter: string) => void;
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

  const loadDeposits = useCallback(async (accountId: string) => {
    setLoadedDeposits(false);
    const { data } = await api.get<IDepositData[]>(`/deposits`, {
      params: { accountId, _sort: 'createdAt', _order: 'desc' },
    });
    setDeposits(data);
    setFilteredDeposits(data);
    setLoadedDeposits(true);
  }, []);

  const newDeposit = useCallback(
    async (deposit: IDepositData, account: IAccountData) => {
      try {
        setLoadedDeposits(false);
        await api.post('/deposits', deposit);
        await editAccount({ ...account, balance: account.balance + deposit.value });

        setFilteredDeposits((oldstate) => [...oldstate, deposit]);
        setDeposits((oldstate) => [...oldstate, deposit]);
      } catch {
        throw new Error('Não foi possível realizar este depósito');
      } finally {
        setLoadedDeposits(true);
      }
    },
    [editAccount]
  );

  const filterDeposits = useCallback(
    (filter: string) => {
      const filteredDeposits = deposits.filter((deposit) => {
        if (formatDate(Number(filter)) === formatDate(deposit.createdAt)) {
          return deposit;
        }
      });

      setFilteredDeposits(filteredDeposits);
    },
    [deposits]
  );

  const refreshFilteredDeposits = useCallback(() => {
    setFilteredDeposits(deposits);
  }, [deposits]);

  return (
    <DepositContext.Provider
      value={{
        refreshFilteredDeposits,
        filterDeposits,
        filteredDeposits,
        loadDeposits,
        loadedDeposits,
        newDeposit,
      }}
    >
      {children}
    </DepositContext.Provider>
  );
}
