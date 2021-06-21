import React, { useState } from 'react';
import { useCallback } from 'react';
import { createContext, ReactNode } from 'react';
import { api } from '../services/api';
import { IAccountData } from '../types/IAccount';

interface IAccountContext {
  filteredAccounts: IAccountData[];
  loadedAccounts: boolean;
  selectedAccount: IAccountData;
  setSelectedAccount: (account: IAccountData) => void;
  loadAccounts: (clientId: string) => Promise<void>;
  newAccount: (account: IAccountData) => Promise<void>;
  editAccount: (account: IAccountData) => Promise<void>;
  removeAccount: (accountId: string) => Promise<void>;
  filterAccounts: (filter: string) => void;
  refreshFilteredAccounts: () => void;
}

export const AccountContext = createContext({} as IAccountContext);

interface IAcccountProviderProps {
  children: ReactNode;
}

export function AccountProvider({ children }: IAcccountProviderProps) {
  const [selectedAccount, setSelectedAccount] = useState<IAccountData>({} as IAccountData);
  const [accounts, setAccounts] = useState<IAccountData[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<IAccountData[]>([]);
  const [loadedAccounts, setLoadedAccounts] = useState<boolean>(false);

  const loadAccounts = useCallback(async (clientId: string) => {
    setLoadedAccounts(false);
    const { data } = await api.get<IAccountData[]>(`/accounts`, {
      params: { clientId, _sort: 'createdAt', _order: 'desc' },
    });
    setAccounts(data);
    setFilteredAccounts(data);
    setLoadedAccounts(true);
  }, []);

  const newAccount = useCallback(async (account: IAccountData) => {
    try {
      setLoadedAccounts(false);
      await api.post('/accounts', account);

      setFilteredAccounts((oldstate) => [...oldstate, account]);
      setAccounts((oldstate) => [...oldstate, account]);
    } catch {
      throw new Error('Não foi possível cadastrar esta conta');
    } finally {
      setLoadedAccounts(true);
    }
  }, []);

  const editAccount = useCallback(async (account: IAccountData) => {
    try {
      setLoadedAccounts(false);
      await api.put(`/accounts/${account.id}`, account);

      setFilteredAccounts((oldstate) =>
        oldstate.map((acc) => (acc.id === account.id ? account : acc))
      );

      setAccounts((oldstate) => oldstate.map((acc) => (acc.id === account.id ? account : acc)));
    } catch {
      throw new Error('Não foi possível editar esta conta');
    } finally {
      setLoadedAccounts(true);
    }
  }, []);

  const removeAccount = useCallback(async (accountId: string) => {
    setLoadedAccounts(false);
    try {
      await api.delete(`/accounts/${accountId}`);
      setFilteredAccounts((oldstate) => oldstate.filter((account) => account.id !== accountId));
      setAccounts((oldstate) => oldstate.filter((account) => account.id !== accountId));
    } catch {
      throw new Error('Não foi possível deletar este usuário');
    } finally {
      setLoadedAccounts(true);
    }
  }, []);

  const filterAccounts = useCallback(
    (filter: string) => {
      setFilteredAccounts(
        accounts.filter((account) => {
          if (
            account.number.trim().toLocaleLowerCase().includes(filter.trim().toLocaleLowerCase())
          ) {
            return account;
          }
        })
      );
    },
    [accounts]
  );

  function refreshFilteredAccounts() {
    setFilteredAccounts(accounts);
  }

  return (
    <AccountContext.Provider
      value={{
        filterAccounts,
        filteredAccounts,
        loadAccounts,
        loadedAccounts,
        newAccount,
        refreshFilteredAccounts,
        removeAccount,
        selectedAccount,
        setSelectedAccount,
        editAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
