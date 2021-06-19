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
import { MaskService } from 'react-native-masked-text';
import format from 'date-fns/format';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

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
          <BalanceText>
            {MaskService.toMask('money', String(value), {
              maskType: 'BRL',
              unit: '',
            })}
          </BalanceText>
        </BalanceContainer>

        <InfoContainer>
          <Title>Histórico</Title>
          <Info>{description}</Info>
        </InfoContainer>

        <InfoContainer>
          <Title>Data</Title>
          <Info>{createdAt}</Info>
        </InfoContainer>
      </Content>
    </Container>
  );
}
