import styled from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  height: 200px;
  width: 100%;

  background: ${(props) => props.theme.colors.orange};

  justify-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  padding: 30px;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 36px;
  color: ${(props) => props.theme.colors.light};
  font-family: ${(props) => props.theme.fonts.bold};
  text-align: center;
`;

export const Icon = styled(Feather)`
  font-size: 36px;
  color: ${(props) => props.theme.colors.light};
`;
