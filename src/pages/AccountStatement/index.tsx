import React, { useEffect } from 'react';
import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { useRoute } from '@react-navigation/native';
import { AccountStatementCard } from '../../components/AccountStatementCard';
import { IStatementDataParams } from '../../types/IStatement';
import { useDeposits } from '../../hooks/useDeposits';
import { Loading } from '../../components/Loading';
import { RefreshControl } from 'react-native';

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
