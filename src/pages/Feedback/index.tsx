import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';

import { IFeedbackProps } from '../../types/IFeedback';
import { emojis } from '../../utils/emojis';

import { Container, Content, Title, Info, Emoji } from './styles';

export function Feedback() {
  const { params } = useRoute();
  const { title, emoji, info, buttonTitle, redirect } = params as IFeedbackProps;

  return (
    <Container>
      <View />

      <Content>
        <Emoji>{emojis[emoji]}</Emoji>
        <Title>{title}</Title>
        <Info>{info}</Info>
      </Content>

      <Button onPress={redirect} title={buttonTitle} />
    </Container>
  );
}
