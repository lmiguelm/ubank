import React from 'react';
import { Container, List } from './styles';

import { PrimaryHeader } from '../../components/PrimaryHeader';
import { ClientCard } from '../../components/ClientCard';

const headerButtons = [
  {
    title: 'Novo',
  },
  {
    title: 'Buscar',
  },
];

export function Client() {
  return (
    <Container>
      <PrimaryHeader title="Clientes" subtitle="Gerencie seus clientes." buttons={headerButtons} />

      <List
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={() => <ClientCard />}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
