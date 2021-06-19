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
import { useRoute } from '@react-navigation/native';
import { IAccountStatementrDetailParams } from '../../types/IAccountStatementDetail';
import { formatDateWithHours } from '../../utils/date';
import { formatMoneyWhitoutR$ } from '../../utils/money';

export function AccountStatementDetail() {
  const { params } = useRoute();
  const {
    deposit: { value, description, createdAt },
  } = params as IAccountStatementrDetailParams;

  return (
    <Container>
      <SecondHeader title="Detalhe do depósito" />

      <Content>
        <BalanceContainer>
          <BalanceTitle>R$</BalanceTitle>
          <BalanceText>{formatMoneyWhitoutR$(value)}</BalanceText>
        </BalanceContainer>

        <InfoContainer>
          <Title>Histórico</Title>
          <Info>{description}</Info>
        </InfoContainer>

        <InfoContainer>
          <Title>Data</Title>
          <Info>{formatDateWithHours(createdAt)}</Info>
        </InfoContainer>
      </Content>
    </Container>
  );
}
