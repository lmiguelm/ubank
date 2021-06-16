import React, { useCallback, useState } from 'react';
import { Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { CardButton } from '../CardButton';

import { Container, TextInfo, InfoContainer, Arrow, ButtonsContainer } from './styles';

import { useNavigation } from '@react-navigation/native';
import { IClientData } from '../../types/IClient';
import { emojis } from '../../utils/emojis';
import Feather from '@expo/vector-icons/Feather';

export function AccountCard() {
  const { navigate } = useNavigation();

  const [isActive, setIsActive] = useState(false);

  const handleToAccountPage = useCallback(() => {
    navigate('Account');
  }, []);

  function handleEditAccount() {}
  function handleToExtract() {}

  async function handleRemoveAccount() {
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
          <TextInfo>
            {/* <Feather name="minus-circle" color="red" size={24} /> Luis Miguel */}
            <Feather name="circle" color="green" size={24} /> Luis Miguel
          </TextInfo>
          <TextInfo>{emojis.balance} R$ 1.200,00</TextInfo>
        </InfoContainer>

        <TouchableOpacity onPress={toggleActive} activeOpacity={0.8}>
          {!isActive ? <Arrow name="chevron-down" /> : <Arrow name="chevron-up" />}
        </TouchableOpacity>

        {isActive && (
          <ButtonsContainer>
            <CardButton onPress={handleEditAccount} title="Editar" iconName="edit" />
            <CardButton onPress={handleToAccountPage} title="Depositar" iconName="dollar-sign" />
            <CardButton onPress={handleToExtract} title="Extrato" iconName="file" />
            <CardButton onPress={handleRemoveAccount} title="Remover" iconName="trash-2" />
          </ButtonsContainer>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}
