import React, { useState, useEffect, useRef } from 'react';

import {
  ModalProps,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';
import Picker, { Event } from '@react-native-community/datetimepicker';
import { TextMaskInstance } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';

import { format, toDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
  Container,
  IconContainer,
  StatusContaienr,
  StatusText,
  Button,
  TextButton,
  DatePickerContainer,
  Placeholder,
} from './styles';

import uuid from 'react-native-uuid';

import { Input } from '../../../components/Input';
import { InputMask } from '../../../components/Input/Mask';

import { useAccounts } from '../../../hooks/useAccounts';
import { formatDate } from '../../../utils/date';
import { delay } from '../../../utils/delay';

import { IAccountData } from '../../../types/IAccount';
import { IFeedbackDataParams } from '../../../types/IFeedback';

interface IAccountModalProps extends ModalProps {
  account?: IAccountData;
  clientId: string;
  handleCloseModal: () => void;
}

export function AccountModal({
  visible,
  clientId,
  account,
  handleCloseModal,
  ...rest
}: IAccountModalProps) {
  const existsIdAccount = !!account?.id;

  const { navigate } = useNavigation();

  const { newAccount, editAccount } = useAccounts();

  const numberRef = useRef<TextMaskInstance>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [number, setNumber] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<Date | undefined>();
  const [status, setStatus] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [enabledButton, setEnabledButton] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    if (account && !!Object.values(account).length) {
      setNumber(account.number);
      setCreatedAt(toDate(account.createdAt));
      setStatus(account.status);
      setPassword(account.password);
    } else {
      delay(500).then(() => numberRef.current?.getElement().focus());
    }
  }, [account, visible]);

  useEffect(() => {
    if (password == confirmPassword && password.length >= 5 && number.length == 7) {
      setEnabledButton(true);
    } else {
      setEnabledButton(false);
    }
  }, [password, confirmPassword, number]);

  function toggleStatus() {
    setStatus((oldvalue) => !oldvalue);
  }

  async function handleNewAccount() {
    Keyboard.dismiss();

    const data: IAccountData = {
      id: String(uuid.v4()),
      createdAt: createdAt?.getTime() || Date.now(),
      status: true,
      number,
      password,
      balance: 0,
      clientId,
    };

    closeModal();

    try {
      await newAccount(data);

      navigate('Feedback', {
        emoji: 'wink',
        title: 'Opa!',
        info: 'Conta cadastrada com sucesso.',
        buttonTitle: 'Continuar',
        routeName: 'Account',
      } as IFeedbackDataParams);
    } catch (error) {
      navigate('Feedback', {
        emoji: 'sad',
        title: 'Ops!',
        info: error.message,
        buttonTitle: 'Entendi',
        routeName: 'Account',
      } as IFeedbackDataParams);
    }
  }

  async function handleEditAccount() {
    Keyboard.dismiss();

    const data: IAccountData = {
      id: account?.id ?? '',
      number: account?.number ?? '',
      createdAt: account?.createdAt ?? Date.now(),
      balance: account?.balance ?? 0,
      status,
      password,
      clientId,
    };

    closeModal();

    try {
      await editAccount(data);
      navigate('Feedback', {
        emoji: 'wink',
        title: 'Opa!',
        info: 'Conta editada com sucesso.',
        buttonTitle: 'Continuar',
        routeName: 'Account',
      } as IFeedbackDataParams);
    } catch (error) {
      navigate('Feedback', {
        emoji: 'sad',
        title: 'Ops!',
        info: error.message,
        buttonTitle: 'Continuar',
        routeName: 'Account',
      } as IFeedbackDataParams);
    }
  }

  function toggleDatePicker() {
    setShowDatePicker((oldvalue) => !oldvalue);
  }

  function handleChangePicker(_: Event, dateTime: Date | undefined) {
    setShowDatePicker(false);
    setCreatedAt(dateTime ? dateTime : new Date());
    passwordRef.current?.focus();
  }

  function closeModal() {
    handleCloseModal();
    clear();
  }

  function clear() {
    setCreatedAt(undefined);
    setNumber('');
    setPassword('');
    setConfirmPassword('');
    setStatus(true);
  }

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Modal {...rest} visible={visible}>
            <Container>
              <IconContainer onPress={closeModal}>
                <Feather name="x" color="red" size={24} />
              </IconContainer>

              <InputMask
                ref={numberRef}
                value={number}
                onChangeText={(number) => setNumber(number)}
                keyboardType="number-pad"
                type="custom"
                options={{
                  mask: '99999-9',
                }}
                placeholder="Número da conta"
                editable={!existsIdAccount}
                onEndEditing={toggleDatePicker}
              />

              {existsIdAccount ? (
                <DatePickerContainer>
                  <Feather name="calendar" size={24} color="#454545" style={{ marginRight: 10 }} />

                  {createdAt && <Placeholder>{formatDate(createdAt.getTime())}</Placeholder>}
                </DatePickerContainer>
              ) : (
                <TouchableOpacity activeOpacity={0.5} onPress={toggleDatePicker}>
                  <DatePickerContainer>
                    <Feather
                      name="calendar"
                      size={24}
                      color="#454545"
                      style={{ marginRight: 10 }}
                    />

                    {!createdAt ? (
                      <Placeholder>Data de abertura</Placeholder>
                    ) : (
                      <Placeholder>{format(createdAt, 'dd/MM/yyyy', { locale: ptBR })}</Placeholder>
                    )}
                  </DatePickerContainer>
                </TouchableOpacity>
              )}

              <Input
                ref={passwordRef}
                value={password}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                placeholder="Senha"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              />

              <Input
                ref={confirmPasswordRef}
                value={confirmPassword}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                placeholder="Confirme a senha"
              />

              {existsIdAccount && (
                <StatusContaienr onPress={toggleStatus}>
                  {status ? (
                    <>
                      <Feather name="circle" size={24} color="green" />
                      <StatusText>Ativa</StatusText>
                    </>
                  ) : (
                    <>
                      <Feather name="circle" size={24} color="red" />
                      <StatusText>Inativa</StatusText>
                    </>
                  )}
                </StatusContaienr>
              )}

              {enabledButton ? (
                <TouchableOpacity onPress={existsIdAccount ? handleEditAccount : handleNewAccount}>
                  <Button>
                    <TextButton>Salvar</TextButton>
                  </Button>
                </TouchableOpacity>
              ) : (
                <Button
                  style={{
                    opacity: 0.5,
                  }}
                >
                  <TextButton>Salvar</TextButton>
                </Button>
              )}
            </Container>
          </Modal>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {showDatePicker && (
        <Picker
          mode="date"
          maximumDate={new Date()}
          value={createdAt ?? new Date()}
          onChange={handleChangePicker}
          locale="pt-BR"
        />
      )}
    </>
  );
}
