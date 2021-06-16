import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Header = styled.View`
  height: 250px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.orange};
  padding: 30px;
`;

export const Title = styled.Text`
  font-size: 48px;
  color: ${(props) => props.theme.colors.light};
  font-family: ${(props) => props.theme.fonts.bold};
  margin-bottom: 10px;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.light};
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const Button = styled(RectButton)`
  background: ${(props) => props.theme.colors.light};

  justify-content: center;
  align-items: center;

  height: 40px;
  width: 100px;

  margin-right: 10px;
  margin-top: 10px;
  border-radius: 10px;
`;

export const TextButton = styled.Text`
  color: ${(props) => props.theme.colors.orange};
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fonts.bold};
`;
