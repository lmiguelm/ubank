import React, { useEffect } from 'react';
import { RefreshControl, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { AccountStatementCard } from '../../components/AccountStatementCard';
import { useDeposits } from '../../hooks/useDeposits';
import { Loading } from '../../components/Loading';

import { IStatementDataParams } from '../../types/IStatement';
import { NotFound } from '../../components/NotFound';

export function AccountStatement() {
  const { params } = useRoute();
  const { accountId, accountNumber } = params as IStatementDataParams;

  const {
    loadDeposits,
    loadedDeposits,
    filteredDeposits,
    filterDeposits,
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
        onFilter={filterDeposits}
        onRefresh={refreshFilteredDeposits}
      />

      {filteredDeposits.length > 0 ? (
        <List
          data={filteredDeposits}
          keyExtractor={(item: any) => String(item.id)}
          renderItem={({ item }: any) => <AccountStatementCard deposit={item} key={item.id} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={!loadedDeposits}
              onRefresh={() => loadDeposits(accountId)}
            />
          }
        />
      ) : (
        <NotFound title="Não há nenhum depósito realizado para está conta." />
      )}
    </Container>
  );
}
