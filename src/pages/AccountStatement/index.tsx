import React, { useCallback } from 'react';
import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IClientData } from '../../types/IClient';
import { AccountStatementCard } from '../../components/AccountStatementCard';
import { IStatementDataParams } from '../../types/IStatement';
import { useEffect } from 'react';
import { useDeposits } from '../../hooks/useDeposits';
import { Loading } from '../../components/Loading';
import { RefreshControl } from 'react-native';

export function AccountStatement() {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { accountId, accountNumber } = params as IStatementDataParams;

  const { loadDeposits, loadedDeposits, filteredDeposits } = useDeposits();

  useEffect(() => {
    loadDeposits(accountId);
  }, []);

  const onNewUser = useCallback(() => {
    navigate('RegisterClient', {} as IClientData);
  }, []);

  const onFilterUsers = useCallback((callback: string) => {
    console.log(callback);
  }, []);

  const onRefreshUsers = useCallback(() => {}, []);

  if (!loadedDeposits) {
    return <Loading />;
  }

  return (
    <Container>
      <PrimaryHeader
        title="Extrato"
        subtitle={`Conta nº ${accountNumber}`}
        onNew={onNewUser}
        onFilter={onFilterUsers}
        onRefresh={onRefreshUsers}
      />

      <List
        data={filteredDeposits}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: any) => <AccountStatementCard deposit={item} key={item.id} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={!loadedDeposits} onRefresh={() => loadDeposits(accountId)} />
        }
      />
    </Container>
  );
}
