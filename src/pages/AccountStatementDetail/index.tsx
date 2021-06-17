import React from 'react';

import {
  BalanceContainer,
  BalanceText,
  BalanceTitle,
  Container,
  Content,
  Info,
  InfoContainer,
  Title,
} from './styles';

import { SecondHeader } from '../../components/SecondHeader';

export function AccountStatementDetail() {
  return (
    <Container>
      <SecondHeader title="Detalhe do depósito" />

      <Content>
        <BalanceContainer>
          <BalanceTitle>R$</BalanceTitle>
          <BalanceText>40,00</BalanceText>
        </BalanceContainer>

        <InfoContainer>
          <Title>Histórico</Title>
          <Info>Deposito para o Luis Miguel, 12345-6 no valor de R$ 40,00</Info>
        </InfoContainer>

        <InfoContainer>
          <Title>Data</Title>
          <Info>14/06/2121 ás 22:45</Info>
        </InfoContainer>
      </Content>
    </Container>
  );
}
