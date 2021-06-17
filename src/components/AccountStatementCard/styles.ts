import styled from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';

export const Container = styled.View`
  width: 300px;

  background-color: ${(props) => props.theme.colors.light};
  border: 2px solid ${(props) => props.theme.colors.orange};
  border-radius: 10px;

  margin-bottom: 10px;
`;

export const InfoContainer = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextInfo = styled.Text`
  font-size: 14px;
  line-height: 40px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.black};
  text-transform: uppercase;
`;

export const TextBalance = styled.Text`
  font-size: 18px;
  line-height: 40px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.blue};
`;

export const Arrow = styled(Feather)`
  font-size: 24px;
  color: ${(props) => props.theme.colors.orange};
  align-self: center;
`;
