import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import Father from '@expo/vector-icons/Feather';

export const Container = styled(RectButton)`
  height: 100px;
  width: 100px;

  background-color: ${(props) => props.theme.colors.orange};
  border-radius: 10px;

  justify-content: center;
  align-items: center;

  margin: 5px;
`;

export const Icon = styled(Father)`
  font-size: 24px;
  color: ${(props) => props.theme.colors.light};
  margin-bottom: 5px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.light};
  font-family: ${(props) => props.theme.fonts.bold};
`;
