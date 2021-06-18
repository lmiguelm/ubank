import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Feather from '@expo/vector-icons/Feather';
import { Container, DatePickerContainer, Form, Placeholder } from './styles';

import { SecondHeader } from '../../components/SecondHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import Picker, { Event } from '@react-native-community/datetimepicker';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { unmaskCpf } from '../../utils/mask';
import uuid from 'react-native-uuid';

import { IFeedbackProps } from '../../types/IFeedback';
import { IClientData } from '../../types/IClient';

import { useClients } from '../../hooks/useClients';

export function RegisterClient() {
  const { navigate } = useNavigation();

  const { newClient } = useClients();

  const [cpf, setCpf] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [birthDate, setBithDate] = useState<Date | undefined>();

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [enabledButton, setEnabledButton] = useState<boolean>(false);

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

  async function handleSaveNewClient() {
    const userData: IClientData = {
      id: String(uuid.v4()),
      cpf: unmaskCpf(cpf),
      name,
      birthDate: format(Number(birthDate), 'dd/MM/yyyy', { locale: ptBR }),
    };

    try {
      newClient(userData);
      navigate('Feedback', {
        title: 'Opa!',
        emoji: 'wink',
        info: 'Cliente salvo com sucesso.',
        buttonTitle: 'Continuar',
        routeName: 'Client',
      } as IFeedbackProps);
    } catch {
      navigate('Feedback', {
        title: 'Ops!',
        emoji: 'sad',
        info: 'Infelizmente não conseguimos salvar. Tente novamente.',
        buttonTitle: 'Entendi',
        routeName: 'Client',
      } as IFeedbackProps);
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <SecondHeader title="Novo Cliente" />

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

              <Button
                onPress={handleSaveNewClient}
                title="Salvar"
                enabled={enabledButton}
                style={enabledButton ? { marginTop: 20 } : { marginTop: 20, opacity: 0.5 }}
              />
            </Form>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {showDatePicker && (
        <Picker
          mode="date"
          maximumDate={new Date()}
          value={birthDate ?? new Date()}
          onChange={handleChangePicker}
          locale="pt-BR"
        />
      )}
    </>
  );
}
