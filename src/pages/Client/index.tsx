import React, { useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { ClientCard } from '../../components/ClientCard';
import { Loading } from '../../components/Loading';

import { useClients } from '../../hooks/useClients';

import { IRegisterClientsDataParams } from '../../types/IRegisterClients';
import { IClientData } from '../../types/IClient';
import { NotFound } from '../../components/NotFound';

export function Client() {
  const { navigate } = useNavigation();

  const { filteredClients, loadedClients, loadClients, filterClients, refreshFilteredClients } =
    useClients();

  const onNewClient = useCallback(() => {
    const client: IClientData = {} as IClientData;
    navigate('RegisterClient', { client } as IRegisterClientsDataParams);
  }, []);

  if (!loadedClients) {
    return <Loading />;
  }

  return (
    <Container>
      <PrimaryHeader
        title="Clientes"
        subtitle="Gerencie seus clientes."
        onNew={onNewClient}
        onFilter={filterClients}
        onRefresh={refreshFilteredClients}
      />

      {filteredClients.length > 0 ? (
        <List
          data={filteredClients}
          keyExtractor={(item: any) => String(item.id)}
          renderItem={({ item }: any) => <ClientCard client={item} key={item.id} />}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={!loadedClients} onRefresh={loadClients} />}
        />
      ) : (
        <NotFound title="Não há nenhum cliente cadastrado." />
      )}
    </Container>
  );
}
