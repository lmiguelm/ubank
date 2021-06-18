import React, { useCallback } from 'react';
import { RefreshControl } from 'react-native';

import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { ClientCard } from '../../components/ClientCard';
import { useNavigation } from '@react-navigation/native';

import { Loading } from '../../components/Loading';
import { useClients } from '../../hooks/useClients';

export function Client() {
  const { navigate } = useNavigation();

  const { filteredClients, loadedClients, loadClients, filterClients, refreshFilteredClients } =
    useClients();

  const onNewClient = useCallback(() => navigate('RegisterClient'), []);

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

      <List
        data={filteredClients}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: any) => <ClientCard client={item} />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={!loadedClients} onRefresh={loadClients} />}
      />
    </Container>
  );
}
