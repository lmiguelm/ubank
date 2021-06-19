import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { Container, TextInfo, InfoContainer, Arrow, TextBalance } from './styles';

import { useNavigation } from '@react-navigation/native';
import { IDepositData } from '../../types/IDeposit';

import { MaskService } from 'react-native-masked-text';
import { IAccountStatementrDetailParams } from '../../types/IAccountStatementDetail';

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
          <TextBalance>
            {MaskService.toMask('money', String(deposit.value), {
              maskType: 'BRL',
            })}
          </TextBalance>

          <TextInfo>
            <Arrow name="chevron-right" size={24} />
          </TextInfo>
        </InfoContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
