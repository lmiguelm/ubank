import React, { useCallback, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaskService } from 'react-native-masked-text';

import { Container, TextInfo, InfoContainer, Arrow, ButtonsContainer } from './styles';

import { CardButton } from '../CardButton';

import { formatDate } from '../../utils/date';
import { useClients } from '../../hooks/useClients';

import { IClientData } from '../../types/IClient';
import { IAccountDataParams } from '../../types/IAccount';
import { IRegisterClientsDataParams } from '../../types/IRegisterClients';
import { IFeedbackDataParams } from '../../types/IFeedback';

interface IClientCardProps {
  client: IClientData;
}

export function ClientCard({ client: { id, name, cpf, birthDate } }: IClientCardProps) {
  const { navigate } = useNavigation();

  const { removeClient } = useClients();

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
        onPress: async () => {
          try {
            await removeClient(id);
            navigate('Feedback', {
              emoji: 'wink',
              title: 'Sucesso!',
              info: 'Cliente removido com sucesso.',
              buttonTitle: 'Continuar',
              routeName: 'Client',
            } as IFeedbackDataParams);
          } catch (error) {
            navigate('Feedback', {
              emoji: 'sad',
              title: 'Erro!',
              info: error.message,
              buttonTitle: 'Entendi',
              routeName: 'Client',
            } as IFeedbackDataParams);
          }
        },
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
    <Container>
      <InfoContainer>
        <TextInfo>😀 {name}</TextInfo>
        <TextInfo>📄 {MaskService.toMask('cpf', String(cpf))}</TextInfo>
        <TextInfo>🎂 {formatDate(birthDate)}</TextInfo>
      </InfoContainer>

      <TouchableOpacity onPress={toggleActive}>
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
  );
}
