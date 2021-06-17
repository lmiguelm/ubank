import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { RectButton } from 'react-native-gesture-handler';

import { Container, Icon, Title } from './styles';

interface ISecondHeaderProps {
  title: string;
}

export function SecondHeader({ title }: ISecondHeaderProps) {
  const { goBack } = useNavigation();

  return (
    <Container>
      <RectButton onPress={goBack}>
        <Icon name="arrow-left" />
      </RectButton>

      <Title>{title}</Title>
    </Container>
  );
}
