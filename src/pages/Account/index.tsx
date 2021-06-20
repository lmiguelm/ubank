import React, { useCallback, useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { AccountCard } from '../../components/AccountCard';
import { AccountModal } from './AccountModal';
import { Loading } from '../../components/Loading';
import { useAccounts } from '../../hooks/useAccounts';

import { IAccountData, IAccountDataParams } from '../../types/IAccount';

export function Account() {
  const { params } = useRoute();
  const { client } = params as IAccountDataParams;

  const {
    loadAccounts,
    loadedAccounts,
    filteredAccounts,
    refreshFilteredAccounts,
    filterAccounts,
    selectedAccount,
    setSelectedAccount,
  } = useAccounts();

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    loadAccounts(client.id);
  }, []);

  const newAccount = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedAccount({} as IAccountData);
  }, []);

  if (!loadedAccounts) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <PrimaryHeader
          title="Contas"
          subtitle={`Todas as contas de ${client.name}`}
          onNew={newAccount}
          onFilter={filterAccounts}
          onRefresh={refreshFilteredAccounts}
        />

        <List
          data={filteredAccounts}
          keyExtractor={(item: any) => String(item.id)}
          renderItem={({ item }: any) => (
            <AccountCard account={item} client={client} key={item.id} />
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={!loadAccounts} onRefresh={() => loadAccounts(client.id)} />
          }
        />
      </Container>

      <AccountModal
        clientId={client.id}
        account={selectedAccount}
        onRequestClose={handleCloseModal}
        transparent={true}
        animationType="fade"
        visible={showModal || !!selectedAccount.id}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
