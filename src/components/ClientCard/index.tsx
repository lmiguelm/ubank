import React, { useCallback, useState } from 'react';
import { Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { CardButton } from '../CardButton';

import { Container, TextInfo, InfoContainer, Arrow, ButtonsContainer } from './styles';

import { useNavigation } from '@react-navigation/native';
import { IClientData } from '../../types/IClient';

export function ClientCard() {
  const { navigate } = useNavigation();

  const [isActive, setIsActive] = useState(false);

  const handleToAccountPage = useCallback(() => {
    navigate('Account');
  }, []);

  const handleToRegisterClient = useCallback(() => {
    const data: IClientData = {
      name: 'Luis Miguel',
      cpf: '504.945.939-55',
      birthDate: '18/07/2001',
    };

    navigate('RegisterClient', data);
  }, []);

  async function handleRemoveClient() {
    Alert.alert(`Remover`, `Deseja remover xxx ?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          console.log('usuário removido');
        },
      },
    ]);
  }

  function toggleActive() {
    setIsActive(!isActive);
  }

  return (
    <TouchableWithoutFeedback onPress={toggleActive}>
      <Container>
        <InfoContainer>
          <TextInfo>😀 Luis Miguel</TextInfo>
          <TextInfo>📄 504.945.939-55</TextInfo>
          <TextInfo>🎂 18/07/2001</TextInfo>
        </InfoContainer>

        <TouchableOpacity onPress={toggleActive} activeOpacity={0.8}>
          {!isActive ? <Arrow name="chevron-down" /> : <Arrow name="chevron-up" />}
        </TouchableOpacity>

        {isActive && (
          <ButtonsContainer>
            <CardButton onPress={handleToAccountPage} title="Contas" iconName="credit-card" />
            <CardButton onPress={handleToRegisterClient} title="Editar" iconName="edit" />
            <CardButton onPress={handleRemoveClient} title="Remover" iconName="trash-2" />
          </ButtonsContainer>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}
