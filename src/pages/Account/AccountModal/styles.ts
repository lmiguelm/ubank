import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: red;
  margin: auto;

  width: 90%;
  height: 600px;

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

export const StatusContaienr = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 25px;
  margin-left: 25px;
  align-self: flex-start;
`;

export const StatusText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.light};
  font-family: ${(props) => props.theme.fonts.regular};
  margin-left: 5px;
`;

export const Button = styled.View`
  height: 77px;
  width: 300px;

  background: ${(props) => props.theme.colors.blue};
  border-radius: 10px;

  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  color: ${(props) => props.theme.colors.light};
  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.bold};
  text-transform: uppercase;
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
