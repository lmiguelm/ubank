import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Container, Icon, Title, IconContainer } from './styles';

interface ISecondHeaderProps {
  title: string;
}

export function SecondHeader({ title }: ISecondHeaderProps) {
  const { goBack } = useNavigation();

  return (
    <Container>
      <IconContainer onPress={goBack}>
        <Icon name="arrow-left" />
      </IconContainer>

      <Title>{title}</Title>
    </Container>
  );
}
