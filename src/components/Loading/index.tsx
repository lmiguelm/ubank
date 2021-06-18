import React from 'react';
import LottieView from 'lottie-react-native';

import animation from '../../assets/lotties/bank-gif.json';

import { Container } from './styles';

export function Loading() {
  return (
    <Container>
      <LottieView
        source={animation}
        autoPlay
        loop
        style={{
          height: 600,
          width: 600,
        }}
      />
    </Container>
  );
}
