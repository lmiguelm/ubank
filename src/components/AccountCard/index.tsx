import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';

import { Container, TextInfo, InfoContainer, Arrow, ButtonsContainer } from './styles';

import { CardButton } from '../CardButton';

import { emojis } from '../../utils/emojis';
import { useAccounts } from '../../hooks/useAccounts';
import { formatMoney } from '../../utils/money';

import { IDepositDataParams } from '../../types/IDeposit';
import { IAccountData } from '../../types/IAccount';
import { IClientData } from '../../types/IClient';
import { IStatementDataParams } from '../../types/IStatement';
import { IFeedbackDataParams } from '../../types/IFeedback';

interface IAccountProps {
  account: IAccountData;
  client: IClientData;
}

export function AccountCard({
  client,
  account: { id, clientId, status, password, balance, createdAt, number },
}: IAccountProps) {
  const { navigate } = useNavigation();

  const { removeAccount, setSelectedAccount } = useAccounts();

  const [isActive, setIsActive] = useState(false);

  function handleToDepositPage() {
    const data: IDepositDataParams = {
      account: {
        id,
        clientId,
        status,
        password,
        balance,
        createdAt,
        number,
      },
      client,
    };
    navigate('Deposit', data);
  }

  function handleToAccountStatement() {
    navigate('AccountStatement', {
      accountId: id,
      accountNumber: number,
    } as IStatementDataParams);
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
          try {
            await removeAccount(id);
            navigate('Feedback', {
              emoji: 'wink',
              title: 'Sucesso!',
              info: 'Conta removida com sucesso.',
              buttonTitle: 'Continuar',
              routeName: 'Account',
            } as IFeedbackDataParams);
          } catch (error) {
            navigate('Feedback', {
              emoji: 'sad',
              title: 'Erro!',
              info: error.message,
              buttonTitle: 'Entendi',
              routeName: 'Account',
            } as IFeedbackDataParams);
          }
        },
      },
    ]);
  }

  function toggleActive() {
    setIsActive(!isActive);
  }

  function cannontDepositToInactiveAccount() {
    navigate('Feedback', {
      buttonTitle: 'Entendi',
      emoji: 'sad',
      title: 'Ops!',
      info: 'Não é possível realizar depósitos em uma conta inativa.',
      routeName: 'Account',
    } as IFeedbackDataParams);
  }

  return (
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
          {emojis.balance} {formatMoney(balance)}
        </TextInfo>
      </InfoContainer>

      <TouchableOpacity onPress={toggleActive}>
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
          <CardButton
            onPress={status ? handleToDepositPage : cannontDepositToInactiveAccount}
            title="Depositar"
            iconName="dollar-sign"
          />
          <CardButton onPress={handleToAccountStatement} title="Extrato" iconName="file" />
          <CardButton onPress={handleRemoveAccount} title="Remover" iconName="trash-2" />
        </ButtonsContainer>
      )}
    </Container>
  );
}
