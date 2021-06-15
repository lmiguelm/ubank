import styled from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';

export const Container = styled.View`
  min-height: 200px;
  width: 300px;

  background-color: ${(props) => props.theme.colors.light};
  border: 3px solid ${(props) => props.theme.colors.orange};
  border-radius: 10px;

  margin-bottom: 10px;
`;

export const InfoContainer = styled.View`
  padding: 20px;
`;

export const TextInfo = styled.Text`
  font-size: 24px;
  line-height: 40px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const Arrow = styled(Feather)`
  font-size: 24px;
  color: ${(props) => props.theme.colors.orange};
  align-self: center;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;

  margin-bottom: 20px;
`;
