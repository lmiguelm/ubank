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

import { IFeedbackDataParams } from '../../types/IFeedback';
import { IDepositData, IDepositDataParams } from '../../types/IDeposit';

import { Loading } from '../../components/Loading';
import { useAccounts } from '../../hooks/useAccounts';
import { useDeposits } from '../../hooks/useDeposits';

export function Deposit() {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { account, client } = params as IDepositDataParams;

  const { editAccount } = useAccounts();
  const { newDepoist } = useDeposits();

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
      const deposit: IDepositData = {
        id: String(uuid.v4()),
        value: unmaskmMoney(value) * 100,
        accountId: account.id,
        description: `Depósito para o ${client.name}, ${account.number} no valor de ${value}`,
        createdAt: Date.now(),
      };

      newDepoist(deposit);
      editAccount({ ...account, balance: account.balance + unmaskmMoney(value) * 100 });
      setValue('');

      navigate('Feedback', {
        buttonTitle: 'Continuar',
        title: 'Opa!',
        emoji: 'smile',
        info: 'Depósito realizado com sucesso.',
        routeName: 'Account',
      } as IFeedbackDataParams);
    } catch {
      navigate('Feedback', {
        buttonTitle: 'Tentar Novamente',
        title: 'Ops!',
        emoji: 'sad',
        info: 'Não foi possível realizar o depósito.',
        routeName: 'Deposit',
      } as IFeedbackDataParams);
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
