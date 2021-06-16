import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;

  padding: 60px 0px;

  background: ${(props) => props.theme.colors.orange};
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Emoji = styled.Text`
  font-size: 48px;
  margin-bottom: 20px;
`;
export const Title = styled.Text`
  font-size: 48px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.light};
`;
export const Info = styled.Text`
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.light};
  line-height: 30px;
`;
