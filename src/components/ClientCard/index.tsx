import React, { useCallback, useState } from 'react';
import { Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { CardButton } from '../CardButton';

import { Container, TextInfo, InfoContainer, Arrow, ButtonsContainer } from './styles';

import { useNavigation } from '@react-navigation/native';
import { IClientData } from '../../types/IClient';

import { MaskService } from 'react-native-masked-text';
import { useClients } from '../../hooks/useClients';
import { IAccountDataParams } from '../../types/IAccount';
import { formatDate } from '../../utils/date';
import { IRegisterClientsDataParams } from '../../types/IRegisterClients';

interface IClientCardProps {
  client: IClientData;
}

export function ClientCard({ client: { id, name, cpf, birthDate } }: IClientCardProps) {
  const { navigate } = useNavigation();

  const { removeClient, editClient } = useClients();

  const [isActive, setIsActive] = useState(false);

  const handleToAccountPage = useCallback(() => {
    const client = { id, name, cpf, birthDate };
    navigate('Account', { client } as IAccountDataParams);
  }, []);

  async function handleRemoveClient() {
    Alert.alert(`Remover`, `Deseja remover ${name} ?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => removeClient(id),
      },
    ]);
  }

  async function handleEditClient() {
    const client = { id, name, cpf, birthDate };
    navigate('RegisterClient', { client } as IRegisterClientsDataParams);
  }

  function toggleActive() {
    setIsActive(!isActive);
  }

  return (
    <TouchableWithoutFeedback onPress={toggleActive}>
      <Container>
        <InfoContainer>
          <TextInfo>😀 {name}</TextInfo>
          <TextInfo>📄 {MaskService.toMask('cpf', String(cpf))}</TextInfo>
          <TextInfo>🎂 {formatDate(birthDate)}</TextInfo>
        </InfoContainer>

        <TouchableOpacity onPress={toggleActive} activeOpacity={0.8}>
          {!isActive ? <Arrow name="chevron-down" /> : <Arrow name="chevron-up" />}
        </TouchableOpacity>

        {isActive && (
          <ButtonsContainer>
            <CardButton onPress={handleToAccountPage} title="Contas" iconName="credit-card" />
            <CardButton onPress={handleRemoveClient} title="Remover" iconName="trash-2" />
            <CardButton onPress={handleEditClient} title="Editar" iconName="edit" />
          </ButtonsContainer>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}
