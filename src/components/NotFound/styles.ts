import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const Emoji = styled.Text`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.orange};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 18px;
  text-align: center;
  line-height: 24px;
`;
