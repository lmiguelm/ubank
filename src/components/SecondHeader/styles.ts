import styled from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  min-height: 200px;
  width: 100%;

  background: ${(props) => props.theme.colors.orange};

  justify-content: center;
  align-items: center;
  padding: 60px 30px;
`;

export const Title = styled.Text`
  font-size: 48px;
  color: ${(props) => props.theme.colors.light};
  font-family: ${(props) => props.theme.fonts.bold};
  margin-top: 20px;
  text-align: center;
`;
export const IconContainer = styled(RectButton)`
  align-self: flex-start;
`;

export const Icon = styled(Feather)`
  font-size: 24px;
  color: ${(props) => props.theme.colors.light};
`;
