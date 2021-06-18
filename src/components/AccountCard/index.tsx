import React, { useState } from 'react';
import { Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { CardButton } from '../CardButton';
import { MaskService } from 'react-native-masked-text';

import { Container, TextInfo, InfoContainer, Arrow, ButtonsContainer } from './styles';

import { useNavigation } from '@react-navigation/native';
import { emojis } from '../../utils/emojis';
import Feather from '@expo/vector-icons/Feather';

import { IDepositData } from '../../types/IDeposit';
import { IAccountData } from '../../types/IAccount';

import { useAccounts } from '../../hooks/useAccounts';

interface IAccountProps {
  account: IAccountData;
}

export function AccountCard({
  account: { id, clientId, status, password, balance, createdAt, number },
}: IAccountProps) {
  const { navigate } = useNavigation();

  const { removeAccount, setSelectedAccount } = useAccounts();

  const [isActive, setIsActive] = useState(false);

  function handleToDepositPage() {
    const data: IDepositData = {
      name: 'Luis Miguel',
    };
    navigate('Deposit', data);
  }

  function handleToAccountStatement() {
    navigate('AccountStatement');
  }

  async function handleRemoveAccount() {
    Alert.alert(`Remover`, `Deseja remover conta ${number} ?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          removeAccount(id);
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
            {status ? (
              <>
                <Feather name="circle" color="green" size={24} /> {number}
              </>
            ) : (
              <>
                <Feather name="minus-circle" color="red" size={24} /> {number}
              </>
            )}
          </TextInfo>
          <TextInfo>
            {emojis.balance} {MaskService.toMask('money', String(balance), { maskType: 'BRL' })}
          </TextInfo>
        </InfoContainer>

        <TouchableOpacity onPress={toggleActive} activeOpacity={0.8}>
          {!isActive ? <Arrow name="chevron-down" /> : <Arrow name="chevron-up" />}
        </TouchableOpacity>

        {isActive && (
          <ButtonsContainer>
            <CardButton
              onPress={() =>
                setSelectedAccount({ id, clientId, status, password, balance, createdAt, number })
              }
              title="Editar"
              iconName="edit"
            />
            <CardButton onPress={handleToDepositPage} title="Depositar" iconName="dollar-sign" />
            <CardButton onPress={handleToAccountStatement} title="Extrato" iconName="file" />
            <CardButton onPress={handleRemoveAccount} title="Remover" iconName="trash-2" />
          </ButtonsContainer>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}
