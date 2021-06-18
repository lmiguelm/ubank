import React, { useCallback, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { AccountCard } from '../../components/AccountCard';
import { AccountModal } from './AccountModal';

import { IAccountData, IAccountDataParams } from '../../types/IAccount';
import { useEffect } from 'react';
import { useAccounts } from '../../hooks/useAccounts';
import { Loading } from '../../components/Loading';
import { RefreshControl } from 'react-native';

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
    console.log(client.id);
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
          renderItem={({ item }: any) => <AccountCard account={item} key={item.id} />}
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
