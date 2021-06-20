import React, { useState } from 'react';
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

  async function loadAccounts(clientId: string) {
    setLoadedAccounts(false);
    const { data } = await api.get<IAccountData[]>(`/accounts`, {
      params: { clientId, _sort: 'createdAt', _order: 'desc' },
    });
    setAccounts(data);
    setFilteredAccounts(data);
    setLoadedAccounts(true);
  }

  async function newAccount(account: IAccountData) {
    try {
      setLoadedAccounts(false);
      await api.post('/accounts', account);

      const newAccountArray = [...accounts, account];

      setFilteredAccounts(newAccountArray);
      setAccounts(newAccountArray);
    } catch {
      throw new Error('Não foi possível cadastrar esta conta');
    } finally {
      setLoadedAccounts(true);
    }
  }

  async function editAccount(account: IAccountData) {
    try {
      setLoadedAccounts(false);
      await api.put(`/accounts/${account.id}`, account);

      const arrayAccountUpdated = accounts.map((acc) => {
        if (acc.id == account.id) {
          return account;
        }
        return acc;
      });

      setFilteredAccounts(arrayAccountUpdated);
      setAccounts(arrayAccountUpdated);
    } catch {
      throw new Error('Não foi possível editar esta conta');
    } finally {
      setLoadedAccounts(true);
    }
  }

  async function removeAccount(accountId: string) {
    setLoadedAccounts(false);
    try {
      await api.delete(`/accounts/${accountId}`);
      const filtered = accounts.filter((account) => account.id !== accountId);
      setFilteredAccounts(filtered);
      setAccounts(filtered);
    } catch {
      throw new Error('Não foi possível deletar este usuário');
    } finally {
      setLoadedAccounts(true);
    }
  }

  function filterAccounts(filter: string) {
    setFilteredAccounts(
      accounts.filter((account) => {
        if (account.number.trim().toLocaleLowerCase().includes(filter.trim().toLocaleLowerCase())) {
          return account;
        }
      })
    );
  }

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
