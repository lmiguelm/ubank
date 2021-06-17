import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { Container, TextInfo, InfoContainer, Arrow, TextBalance } from './styles';

import { useNavigation } from '@react-navigation/native';

export function AccountStatementCard() {
  const { navigate } = useNavigation();

  function handleToAccountStatementDetail() {
    navigate('AccountStatementDetail');
  }

  return (
    <TouchableWithoutFeedback onPress={handleToAccountStatementDetail}>
      <Container>
        <InfoContainer>
          <TextInfo>Depósito</TextInfo>
          <TextBalance>R$ 50,00</TextBalance>

          <TextInfo>
            <Arrow name="chevron-right" size={24} />
          </TextInfo>
        </InfoContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
