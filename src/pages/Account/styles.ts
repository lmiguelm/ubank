import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;

  background-color: ${(props) => props.theme.colors.light};
`;

export const List = styled.FlatList`
  margin-top: -40px;
  margin-bottom: 10px;
`;
