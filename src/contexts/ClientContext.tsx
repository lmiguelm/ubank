import React, { createContext, ReactNode, useEffect, useState } from 'react';
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
    loadClients();
  }, []);

  async function loadClients() {
    setLoadedClients(false);
    const { data } = await api.get<IClientData[]>('/clients', {
      params: { _sort: 'name', _order: 'asc' },
    });
    setClients(data);
    setFilteredClients(data);
    setLoadedClients(true);
  }

  async function newClient(client: IClientData) {
    try {
      setLoadedClients(false);
      await api.post('/clients', client);

      const newClientsArray = [...clients, client];

      setFilteredClients(newClientsArray);
      setClients(newClientsArray);
    } catch {
      throw new Error('Não foi possível cadastrar este usuário');
    } finally {
      setLoadedClients(true);
    }
  }

  async function removeClient(clientId: string) {
    setLoadedClients(false);
    try {
      await api.delete(`/clients/${clientId}`);
      const filtered = clients.filter((client) => client.id !== clientId);
      setFilteredClients(filtered);
      setClients(filtered);
    } catch {
      throw new Error('Não foi possível deletar este usuário');
    } finally {
      setLoadedClients(true);
    }
  }

  async function editClient(client: IClientData) {
    setLoadedClients(false);

    try {
      await api.put(`/clients/${client.id}`, client);

      const newArrayClients = clients.map((c) => {
        if (c.id === client.id) {
          return client;
        }
        return c;
      });

      setClients(newArrayClients);
      setFilteredClients(newArrayClients);
    } catch {
      throw new Error('Não foi possível editar este cliente');
    } finally {
      setLoadedClients(true);
    }
  }

  function filterClients(filter: string) {
    setFilteredClients(
      clients.filter((client) => {
        if (client.name.trim().toLocaleLowerCase().includes(filter.trim().toLocaleLowerCase())) {
          return client;
        }
      })
    );
  }

  function refreshFilteredClients() {
    setFilteredClients(clients);
  }

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
