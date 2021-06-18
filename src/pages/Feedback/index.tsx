import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';

import { IFeedbackProps } from '../../types/IFeedback';
import { emojis } from '../../utils/emojis';

import { Container, Content, Title, Info, Emoji } from './styles';

export function Feedback() {
  const { params } = useRoute();
  const { title, emoji, info, buttonTitle, routeName } = params as IFeedbackProps;

  const { navigate } = useNavigation();

  function handleNavigate() {
    navigate(routeName);
  }

  return (
    <Container>
      <View />

      <Content>
        <Emoji>{emojis[emoji]}</Emoji>
        <Title>{title}</Title>
        <Info>{info}</Info>
      </Content>

      <Button onPress={handleNavigate} title={buttonTitle} />
    </Container>
  );
}
