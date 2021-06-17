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

import { useNavigation, useRoute } from '@react-navigation/native';

import { IFeedbackProps } from '../../types/IFeedback';
import { IDepositData } from '../../types/IDeposit';

export function Deposit() {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { name } = params as IDepositData;

  const [setKeyboardIsActive] = useState(false);

  const [balance, setBalance] = useState<string>('');

  const [enabledButton, setEnabledButton] = useState<boolean>(false);

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
    let value = unmaskmMoney(balance as string);

    if (value >= 10 && value <= 5000) {
      setEnabledButton(true);
    } else {
      setEnabledButton(false);
    }
  }, [balance]);

  async function handleSaveDeposit() {
    const data: IFeedbackProps = {
      buttonTitle: 'Continuar',
      title: 'Opa!',
      emoji: 'smile',
      info: 'Depósito realizado com sucesso.',
      redirect() {
        navigate('Client');
      },
    };

    navigate('Feedback', data);

    setBalance('');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, width: '100%' }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <SecondHeader title={`Depósito para ${name}`} />

          <Form>
            <Input
              value={balance}
              options={{
                maskType: 'BRL',
              }}
              type="money"
              onChangeText={(balance) => setBalance(balance)}
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
