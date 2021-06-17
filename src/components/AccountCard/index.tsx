import React, { useCallback, useState } from 'react';
import { Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { CardButton } from '../CardButton';

import { Container, TextInfo, InfoContainer, Arrow, ButtonsContainer } from './styles';

import { useNavigation } from '@react-navigation/native';
import { emojis } from '../../utils/emojis';
import Feather from '@expo/vector-icons/Feather';
import { IDepositData } from '../../types/IDeposit';

export function AccountCard() {
  const { navigate } = useNavigation();

  const [isActive, setIsActive] = useState(false);

  function handleToDepositPage() {
    const data: IDepositData = {
      name: 'Luis Miguel',
    };
    navigate('Deposit', data);
  }

  function handleEditAccount() {}

  function handleToAccountStatement() {
    // todo passar os dados da conta...
    navigate('AccountStatement');
  }

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
            {/* <Feather name="minus-circle" color="red" size={24} /> 12345-6 */}
            <Feather name="circle" color="green" size={24} /> 12345-6
          </TextInfo>
          <TextInfo>{emojis.balance} R$ 1.200,00</TextInfo>
        </InfoContainer>

        <TouchableOpacity onPress={toggleActive} activeOpacity={0.8}>
          {!isActive ? <Arrow name="chevron-down" /> : <Arrow name="chevron-up" />}
        </TouchableOpacity>

        {isActive && (
          <ButtonsContainer>
            <CardButton onPress={handleEditAccount} title="Editar" iconName="edit" />
            <CardButton onPress={handleToDepositPage} title="Depositar" iconName="dollar-sign" />
            <CardButton onPress={handleToAccountStatement} title="Extrato" iconName="file" />
            <CardButton onPress={handleRemoveAccount} title="Remover" iconName="trash-2" />
          </ButtonsContainer>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}
