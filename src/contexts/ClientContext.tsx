import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { api } from '../services/api';
import { IClientData } from '../types/IClient';

interface ClientContextData {
  clients: IClientData[];
  filteredClients: IClientData[];
  loadedClients: boolean;
  loadClients: () => void;
  refreshFilteredClients: () => void;
  filterClients: (filter: string) => void;
  removeClient: (clientId: string) => Promise<void>;
  newClient: (client: IClientData) => Promise<void>;
  editClient: (client: IClientData) => Promise<void>;
}

interface ClientProvideProps {
  children: ReactNode;
}

export const ClientContext = createContext({} as ClientContextData);

export function ClientProvider({ children }: ClientProvideProps) {
  const [clients, setClients] = useState<IClientData[]>([]);
  const [filteredClients, setFilteredClients] = useState<IClientData[]>([]);
  const [loadedClients, setLoadedClients] = useState<boolean>(false);

  useEffect(() => {
    load();
  }, []);

  const loadClients = useCallback(load, []);

  async function load() {
    setLoadedClients(false);
    const { data } = await api.get<IClientData[]>('/clients', {
      params: { _sort: 'name', _order: 'asc' },
    });
    setClients(data);
    setFilteredClients(data);
    setLoadedClients(true);
  }

  const newClient = useCallback(async (client: IClientData) => {
    try {
      setLoadedClients(false);
      await api.post('/clients', client);

      setFilteredClients((oldstate) => [...oldstate, client]);
      setClients((oldstate) => [...oldstate, client]);
    } catch {
      throw new Error('Não foi possível cadastrar este usuário');
    } finally {
      setLoadedClients(true);
    }
  }, []);

  const removeClient = useCallback(async (clientId: string) => {
    setLoadedClients(false);
    try {
      await api.delete(`/clients/${clientId}`);

      setFilteredClients((oldstate) => oldstate.filter((client) => client.id !== clientId));
      setClients((oldstate) => oldstate.filter((client) => client.id !== clientId));
    } catch {
      throw new Error('Não foi possível deletar este usuário');
    } finally {
      setLoadedClients(true);
    }
  }, []);

  const editClient = useCallback(async (client: IClientData) => {
    setLoadedClients(false);

    try {
      await api.put(`/clients/${client.id}`, client);

      setFilteredClients((oldstate) => oldstate.map((c) => (c.id === client.id ? c : client)));
      setClients((oldstate) => oldstate.map((c) => (c.id === client.id ? c : client)));
    } catch {
      throw new Error('Não foi possível editar este cliente');
    } finally {
      setLoadedClients(true);
    }
  }, []);

  const filterClients = useCallback(
    (filter: string) => {
      setFilteredClients(
        clients.filter((client) => {
          if (client.name.trim().toLocaleLowerCase().includes(filter.trim().toLocaleLowerCase())) {
            return client;
          }
        })
      );
    },
    [clients]
  );

  const refreshFilteredClients = useCallback(() => {
    setFilteredClients(clients);
  }, [clients]);

  return (
    <ClientContext.Provider
      value={{
        clients,
        filteredClients,
        loadedClients,
        loadClients,
        removeClient,
        filterClients,
        refreshFilteredClients,
        newClient,
        editClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
