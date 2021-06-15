import React from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { CardButton } from '../CardButton';

import { Container, TextInfo, InfoContainer, Arrow, ButtonsContainer } from './styles';

export function ClientCard() {
  const [isActive, setIsActive] = useState(false);

  function toggleActive() {
    setIsActive(!isActive);
  }

  return (
    <Container>
      <InfoContainer>
        <TextInfo>😀 Luis Miguel</TextInfo>
        <TextInfo>📄 504.945.939-55</TextInfo>
        <TextInfo>🎂 18/07/2001</TextInfo>
      </InfoContainer>

      <TouchableOpacity onPress={toggleActive} activeOpacity={0.8}>
        {!isActive ? <Arrow name="chevron-down" /> : <Arrow name="chevron-up" />}
      </TouchableOpacity>

      {isActive && (
        <ButtonsContainer>
          <CardButton title="Contas" iconName="credit-card" />
          <CardButton title="Editar" iconName="edit" />
          <CardButton title="Remover" iconName="trash-2" />
        </ButtonsContainer>
      )}
    </Container>
  );
}
