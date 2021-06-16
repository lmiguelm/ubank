import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  height: 77px;
  width: 300px;

  background: ${(props) => props.theme.colors.blue};
  border-radius: 10px;

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.light};
  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.bold};
  text-transform: uppercase;
`;
