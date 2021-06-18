import React, { useState, useEffect } from 'react';
import {
  ModalProps,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

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
import { IAccountData } from '../../../types/IAccount';
import { useAccounts } from '../../../hooks/useAccounts';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Picker, { Event } from '@react-native-community/datetimepicker';

interface IAccountModalProps extends ModalProps {
  account?: IAccountData;
  clientId: string;
  handleCloseModal: () => void;
}

export function AccountModal({ clientId, account, handleCloseModal, ...rest }: IAccountModalProps) {
  const existsIdAccount = !!account?.id;

  const { newAccount, editAccount } = useAccounts();

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
      setCreatedAt(parse(account.createdAt, 'dd/MM/yyyy', new Date()));
      setStatus(account.status);
      setPassword(account.password);
    }
  }, [account]);

  useEffect(() => {
    if (password == confirmPassword && password.length >= 5 && number.length == 7) {
      console.log('entro');
      setEnabledButton(true);
    } else {
      setEnabledButton(false);
    }
  }, [password, confirmPassword, number]);

  function toggleStatus() {
    setStatus((oldvalue) => !oldvalue);
  }

  function handleNewAccount() {
    Keyboard.dismiss();

    const data: IAccountData = {
      id: String(uuid.v4()),
      createdAt: format(Number(createdAt), 'dd/MM/yyy', { locale: ptBR }),
      status: true,
      number,
      password,
      balance: 0,
      clientId,
    };

    try {
      newAccount(data);
      clear();
      handleCloseModal();
    } catch (error) {
      Alert.alert(error.data.message);
    }
  }

  function handleEditAccount() {
    Keyboard.dismiss();

    const data: IAccountData = {
      id: account?.id ?? '',
      number: account?.number ?? '',
      createdAt: String(account?.createdAt),
      balance: account?.balance ?? 0,
      status,
      password,
      clientId,
    };

    try {
      editAccount(data);
      clear();
      handleCloseModal();
    } catch (error) {
      Alert.alert(error.data.message);
    }
  }

  function toggleDatePicker() {
    setShowDatePicker((oldvalue) => !oldvalue);
  }

  function handleChangePicker(_: Event, dateTime: Date | undefined) {
    setShowDatePicker(false);
    setCreatedAt(dateTime ? dateTime : new Date());
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
          <Modal {...rest}>
            <Container>
              <IconContainer onPress={closeModal}>
                <Feather name="x" color="red" size={24} />
              </IconContainer>

              <Input
                value={number}
                onChangeText={(number) => setNumber(number)}
                keyboardType="number-pad"
                type="custom"
                options={{
                  mask: '99999-9',
                }}
                placeholder="Número da conta"
                editable={!existsIdAccount}
              />

              {existsIdAccount ? (
                <DatePickerContainer>
                  <Feather name="calendar" size={24} color="#454545" style={{ marginRight: 10 }} />

                  {createdAt && (
                    <Placeholder>{format(createdAt, 'dd/MM/yyyy', { locale: ptBR })}</Placeholder>
                  )}
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
                value={password}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                placeholder="Senha"
              />

              <Input
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
