import React, { useCallback, useState } from 'react';
import { Modal, Text } from 'react-native';

import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { AccountCard } from '../../components/AccountCard';
import { AccountModal } from './AccountModal';

export function Account() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const onNewAccount = useCallback(() => {
    setShowModal(true);
  }, []);

  const onFilterAccounts = useCallback((callback: string) => {
    console.log(callback);
  }, []);

  const onRefreshAccount = useCallback(() => {}, []);

  const handleCloseModal = useCallback(() => {
    setShowModal((oldstate) => !oldstate);
  }, []);

  return (
    <>
      <Container>
        <PrimaryHeader
          title="Contas"
          subtitle="Todas as contas de Luis Miguel"
          onNew={onNewAccount}
          onFilter={onFilterAccounts}
          onRefresh={onRefreshAccount}
        />

        <List
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={() => <AccountCard />}
          showsVerticalScrollIndicator={false}
        />
      </Container>

      <AccountModal
        onRequestClose={handleCloseModal}
        transparent={true}
        animationType="fade"
        visible={showModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
