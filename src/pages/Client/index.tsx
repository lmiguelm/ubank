import React, { useCallback } from 'react';
import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { ClientCard } from '../../components/ClientCard';
import { useNavigation } from '@react-navigation/native';
import { IClientData } from '../../types/IClient';

export function Client() {
  const { navigate } = useNavigation();

  const onNewUser = useCallback(() => {
    navigate('RegisterClient', {} as IClientData);
  }, []);

  const onFilterUsers = useCallback((callback: string) => {
    console.log(callback);
  }, []);

  const onRefreshUsers = useCallback(() => {}, []);

  return (
    <Container>
      <PrimaryHeader
        title="Clientes"
        subtitle="Gerencie seus clientes."
        onNew={onNewUser}
        onFilter={onFilterUsers}
        onRefresh={onRefreshUsers}
      />

      <List
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={() => <ClientCard />}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
