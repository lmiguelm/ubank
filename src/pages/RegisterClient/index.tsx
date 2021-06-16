import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';
import { Container, Content, DatePickerContainer, Form, Placeholder } from './styles';

import { SecondHeader } from '../../components/SecondHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import Picker, { Event } from '@react-native-community/datetimepicker';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { unmaskCpf } from '../../utils/mask';

import { useNavigation, useRoute } from '@react-navigation/native';
import { parse } from 'date-fns/esm';

import { IFeedbackProps } from '../../types/IFeedback';
import { IClientData } from '../../types/IClient';

export function RegisterClient() {
  const { navigate } = useNavigation();

  const { params } = useRoute();
  const { name: nameParams, cpf: cpfParams, birthDate: birthDateParams } = params as IClientData;

  const [keyboardIsActive, setKeyboardIsActive] = useState(false);

  const [cpf, setCpf] = useState<string>(cpfParams ?? '');
  const [name, setName] = useState<string>(nameParams ?? '');
  const [birthDate, setBithDate] = useState<Date | undefined>(
    birthDateParams ? parse(birthDateParams, 'dd/MM/yyyy', new Date()) : undefined
  );

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [enabledButton, setEnabledButton] = useState<boolean>(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardIsActive(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardIsActive(false));
  }, []);

  useEffect(() => {
    if (name?.length !== 0 && String(unmaskCpf(String(cpf))).length === 11 && birthDate) {
      setEnabledButton(true);
    } else {
      setEnabledButton(false);
    }
  }, [cpf, name, birthDate]);

  function toggleDatePicker() {
    setShowDatePicker((oldvalue) => !oldvalue);
  }

  function handleChangePicker(_: Event, dateTime: Date | undefined) {
    setShowDatePicker(false);
    setBithDate(dateTime ? dateTime : new Date());
  }

  const goToClientPage = useCallback(() => {
    navigate('Client');
  }, []);

  async function handleSaveNewClient() {
    const data: IFeedbackProps = {
      title: 'Opa!',
      emoji: 'wink',
      info: 'Cliente salvo com sucesso.',
      buttonTitle: 'Continuar',
      redirect: goToClientPage,
    };

    navigate('Feedback', data);
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%' }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Content>
            {!keyboardIsActive ? <SecondHeader title="Novo Usuário" /> : <View />}

            <Form>
              <Input value={cpf} onChangeText={(cpf) => setCpf(cpf)} placeholder="CPF" type="cpf" />

              <Input
                value={name}
                onChangeText={(name) => setName(name)}
                placeholder="Nome"
                maxLength={100}
              />

              <TouchableOpacity onPress={toggleDatePicker}>
                <DatePickerContainer>
                  <Feather name="calendar" size={24} color="#454545" style={{ marginRight: 10 }} />

                  {!birthDate ? (
                    <Placeholder>Data de nascimento</Placeholder>
                  ) : (
                    <Placeholder style={{ color: '#454545' }}>
                      {format(birthDate, 'dd/MM/yyyy', { locale: ptBR })}
                    </Placeholder>
                  )}
                </DatePickerContainer>
              </TouchableOpacity>

              {showDatePicker && (
                <Picker
                  mode="date"
                  maximumDate={new Date()}
                  value={birthDate ?? new Date()}
                  onChange={handleChangePicker}
                  locale="pt-BR"
                />
              )}

              <Button
                onPress={handleSaveNewClient}
                title="Salvar"
                enabled={enabledButton}
                style={enabledButton ? { marginTop: 20 } : { marginTop: 20, opacity: 0.5 }}
              />
            </Form>
            <View />
          </Content>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
}
