import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title, Icon } from './styles';

interface ICardButtonProps extends RectButtonProps {
  title: string;
  iconName: string;
}

export function CardButton({ title, iconName, ...rest }: ICardButtonProps) {
  return (
    <Container {...rest}>
      <Icon name={iconName} />
      <Title>{title}</Title>
    </Container>
  );
}
