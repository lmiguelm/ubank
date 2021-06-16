import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import { TextInput } from 'react-native-gesture-handler';

export const InputMask = styled(TextInputMask)`
  height: 77px;
  width: 300px;

  background: white;
  border-radius: 10px;

  margin-bottom: 10px;

  padding-left: 30px;

  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const Input = styled(TextInput)`
  height: 77px;
  width: 300px;

  background: white;
  border-radius: 10px;

  margin-bottom: 10px;

  padding-left: 30px;

  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.regular};
`;
