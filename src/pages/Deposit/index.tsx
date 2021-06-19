import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import { Container, Form } from './styles';

import { SecondHeader } from '../../components/SecondHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { unmaskmMoney } from '../../utils/mask';
import uuid from 'react-native-uuid';

import { useNavigation, useRoute } from '@react-navigation/native';

import { IFeedbackProps } from '../../types/IFeedback';
import { IDepositData, IDepositDataParams } from '../../types/IDeposit';

import { api } from '../../services/api';
import { Loading } from '../../components/Loading';
import { useAccounts } from '../../hooks/useAccounts';

export function Deposit() {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { account, client } = params as IDepositDataParams;

  const { editAccount } = useAccounts();

  const [value, setValue] = useState<string>('');

  const [enabledButton, setEnabledButton] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    Alert.alert(
      '🚨 Atenção 🚨 ',
      'O limite minímo para depósito é de R$ 10,00 e o máximo é de R$ 5.000,00',
      [
        {
          text: 'Entendi',
        },
      ]
    );
  }, []);

  useEffect(() => {
    let result = unmaskmMoney(value);

    if (result >= 10 && result <= 5000) {
      setEnabledButton(true);
    } else {
      setEnabledButton(false);
    }
  }, [value]);

  async function handleSaveDeposit() {
    setLoaded(false);
    try {
      await api.post(`/deposits/`, {
        id: String(uuid.v4()),
        value: unmaskmMoney(value),
        accountId: account.id,
        description: `Depósito para o ${client.name}, ${account.number} no valor de ${value}`,
      } as IDepositData);

      editAccount({ ...account, balance: account.balance + unmaskmMoney(value) });
      setValue('');

      navigate('Feedback', {
        buttonTitle: 'Continuar',
        title: 'Opa!',
        emoji: 'smile',
        info: 'Depósito realizado com sucesso.',
        routeName: 'Account',
      } as IFeedbackProps);
    } catch {
      navigate('Feedback', {
        buttonTitle: 'Tentar Novamente',
        title: 'Ops!',
        emoji: 'sad',
        info: 'Não foi possível realizar o depósito.',
        routeName: 'Deposit',
      } as IFeedbackProps);
    } finally {
      setLoaded(true);
    }
  }

  if (!loaded) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, width: '100%' }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <SecondHeader title={`Depósito na conta ${account.number}`} />

          <Form>
            <Input
              value={value}
              options={{
                maskType: 'BRL',
              }}
              type="money"
              onChangeText={(value) => setValue(value)}
              placeholder="Valor"
            />

            <Button
              onPress={handleSaveDeposit}
              title="Depositar"
              enabled={enabledButton}
              style={enabledButton ? { marginTop: 20 } : { marginTop: 20, opacity: 0.5 }}
            />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
