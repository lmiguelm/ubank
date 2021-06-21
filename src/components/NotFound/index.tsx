import React from 'react';

import { Container, Title, Emoji } from './styles';

interface INotFoundProps {
  title: string;
}

export function NotFound({ title }: INotFoundProps) {
  return (
    <Container>
      <Emoji>😐</Emoji>
      <Title>{title}</Title>
    </Container>
  );
}
