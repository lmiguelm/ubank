import { useContext } from 'react';
import { ClientContext } from '../contexts/ClientContext';

export function useClients() {
  return useContext(ClientContext);
}
