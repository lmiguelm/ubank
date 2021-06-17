import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background: ${(props) => props.theme.colors.light};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
`;

export const BalanceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const BalanceTitle = styled.Text`
  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.black};
  margin-right: 10px;
`;
export const BalanceText = styled.Text`
  font-size: 48px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.blue};
`;

export const InfoContainer = styled.View`
  margin: 20px 0px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 5px;
`;
export const Info = styled.Text`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.black};
`;
