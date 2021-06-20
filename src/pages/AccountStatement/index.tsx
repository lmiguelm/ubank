import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { AccountStatementCard } from '../../components/AccountStatementCard';
import { useDeposits } from '../../hooks/useDeposits';
import { Loading } from '../../components/Loading';

import { IStatementDataParams } from '../../types/IStatement';

export function AccountStatement() {
  const { params } = useRoute();
  const { accountId, accountNumber } = params as IStatementDataParams;

  const {
    loadDeposits,
    loadedDeposits,
    filteredDeposits,
    filterDepositts,
    refreshFilteredDeposits,
  } = useDeposits();

  useEffect(() => {
    loadDeposits(accountId);
  }, []);

  if (!loadedDeposits) {
    return <Loading />;
  }

  return (
    <Container>
      <PrimaryHeader
        title="Extrato"
        subtitle={`Conta nº ${accountNumber}`}
        onFilter={filterDepositts}
        onRefresh={refreshFilteredDeposits}
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
