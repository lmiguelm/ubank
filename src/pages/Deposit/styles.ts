import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.theme.colors.orange};
`;

export const Form = styled.View`
  align-self: center;
  background: ${(props) => props.theme.colors.light};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 150px;
`;

export const DatePickerContainer = styled.View`
  height: 77px;
  width: 300px;

  background: white;
  border-radius: 10px;

  margin-bottom: 10px;

  padding-left: 30px;

  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.regular};

  flex-direction: row;
  align-items: center;
`;

export const Placeholder = styled.Text`
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: #7c7c7c;
`;
