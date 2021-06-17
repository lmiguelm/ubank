import React, { useCallback } from 'react';
import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { useNavigation } from '@react-navigation/native';
import { IClientData } from '../../types/IClient';
import { AccountStatementCard } from '../../components/AccountStatementCard';

export function AccountStatement() {
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
        title="Extrato"
        subtitle="Conta nº 12345-6"
        onNew={onNewUser}
        onFilter={onFilterUsers}
        onRefresh={onRefreshUsers}
      />

      <List
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={() => <AccountStatementCard />}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
