import styled from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';

export const Container = styled.View`
  background-color: red;
  margin: auto;

  width: 90%;
  height: 550px;

  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background: ${(props) => props.theme.colors.black};
`;

export const IconContainer = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 50px;
  margin-right: 30px;
  color: red;
  font-size: 24px;
`;
