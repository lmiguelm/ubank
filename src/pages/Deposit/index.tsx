import React, { useEffect, useState, useRef } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { TextMaskInstance } from 'react-native-masked-text';
import uuid from 'react-native-uuid';

import { Container, Form } from './styles';

import { SecondHeader } from '../../components/SecondHeader';
import { InputMask } from '../../components/Input/Mask';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';

import { unmaskmMoney } from '../../utils/money';
import { useDeposits } from '../../hooks/useDeposits';
import { delay } from '../../utils/delay';

import { IFeedbackDataParams } from '../../types/IFeedback';
import { IDepositData, IDepositDataParams } from '../../types/IDeposit';

export function Deposit() {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { account, client } = params as IDepositDataParams;

  const { newDepoist, loadedDeposits } = useDeposits();

  let inputRef = useRef<TextMaskInstance>(null);

  const [value, setValue] = useState<string>('');

  const [enabledButton, setEnabledButton] = useState<boolean>(false);

  useEffect(() => {
    delay().then(() => {
      console.log(inputRef?.current?.getElement().focus());
    });
  }, []);

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
    setValue('');

    try {
      const deposit: IDepositData = {
        id: String(uuid.v4()),
        value: unmaskmMoney(value) * 100,
        accountId: account.id,
        description: `Depósito para o ${client.name}, ${account.number} no valor de ${value}`,
        createdAt: Date.now(),
      };

      await newDepoist(deposit, account);

      navigate('Feedback', {
        buttonTitle: 'Continuar',
        title: 'Opa!',
        emoji: 'smile',
        info: 'Depósito realizado com sucesso.',
        routeName: 'Account',
      } as IFeedbackDataParams);
    } catch (error) {
      navigate('Feedback', {
        buttonTitle: 'Tentar Novamente',
        title: 'Ops!',
        emoji: 'sad',
        info: error.message,
        routeName: 'Deposit',
      } as IFeedbackDataParams);
    }
  }

  if (!loadedDeposits) {
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
            <InputMask
              ref={inputRef}
              value={value}
              options={{
                maskType: 'BRL',
              }}
              type="money"
              onChangeText={(value) => setValue(value)}
              placeholder="Valor"
              onSubmitEditing={handleSaveDeposit}
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
