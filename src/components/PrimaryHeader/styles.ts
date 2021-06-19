import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Feather from '@expo/vector-icons/Feather';

export const Header = styled.View`
  min-height: 250px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.orange};
  padding: 30px;
`;

export const Title = styled.Text`
  font-size: 48px;
  color: ${(props) => props.theme.colors.light};
  font-family: ${(props) => props.theme.fonts.bold};
  margin-bottom: 5px;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.light};
  font-family: ${(props) => props.theme.fonts.regular};
  margin-bottom: 15px;
`;

export const Button = styled(RectButton)`
  background: ${(props) => props.theme.colors.light};

  justify-content: center;
  align-items: center;

  height: 40px;
  min-width: 100px;
  padding: 15px;

  margin-right: 10px;
  margin-top: 10px;
  border-radius: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: ${(props) => props.theme.colors.orange};
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fonts.bold};
  margin-left: 5px;
`;

export const ButtonContainer = styled(RectButton)`
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const Icon = styled(Feather)`
  font-size: 36px;
  color: ${(props) => props.theme.colors.light};
`;
