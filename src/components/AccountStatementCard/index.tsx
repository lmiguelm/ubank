import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { Container, TextInfo, InfoContainer, Arrow, TextBalance } from './styles';

import { useNavigation } from '@react-navigation/native';
import { IDepositData } from '../../types/IDeposit';

import { IAccountStatementrDetailParams } from '../../types/IAccountStatementDetail';
import { formatMoney } from '../../utils/money';

interface IAccountStatementCardProps {
  deposit: IDepositData;
}

export function AccountStatementCard({ deposit }: IAccountStatementCardProps) {
  const { navigate } = useNavigation();

  function handleToAccountStatementDetail() {
    navigate('AccountStatementDetail', { deposit } as IAccountStatementrDetailParams);
  }

  return (
    <TouchableWithoutFeedback onPress={handleToAccountStatementDetail}>
      <Container>
        <InfoContainer>
          <TextInfo>Depósito</TextInfo>
          <TextBalance>{formatMoney(deposit.value)}</TextBalance>

          <TextInfo>
            <Arrow name="chevron-right" size={24} />
          </TextInfo>
        </InfoContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
