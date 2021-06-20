import React, { useEffect, useState, useRef } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import Picker, { Event } from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
import { TextMaskInstance } from 'react-native-masked-text';

import { format, toDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Container, DatePickerContainer, Form, Placeholder } from './styles';

import { SecondHeader } from '../../components/SecondHeader';
import { Input } from '../../components/Input';
import { InputMask } from '../../components/Input/Mask';
import { Button } from '../../components/Button';

import { unmaskCpf } from '../../utils/cpf';
import { useClients } from '../../hooks/useClients';
import { TextInput } from 'react-native';
import { delay } from '../../utils/delay';

import { IFeedbackDataParams } from '../../types/IFeedback';
import { IClientData } from '../../types/IClient';
import { IRegisterClientsDataParams } from '../../types/IRegisterClients';

export function RegisterClient() {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { client } = params as IRegisterClientsDataParams;

  const cpfInputRef = useRef<TextMaskInstance>(null);
  const nameInputRef = useRef<TextInput>(null);

  const { newClient, editClient } = useClients();

  const [cpf, setCpf] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [birthDate, setBithDate] = useState<Date | undefined>();

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [enabledButton, setEnabledButton] = useState<boolean>(false);

  useEffect(() => {
    delay().then(() => {
      cpfInputRef.current?.getElement().focus();
    });
  }, []);

  useEffect(() => {
    if (client && !!Object.values(client).length) {
      setCpf(String(client.cpf));
      setName(client?.name);
      setBithDate(toDate(client.birthDate));
    }
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

  async function handleSaveNewClient() {
    const clientData: IClientData = {
      id: String(uuid.v4()),
      cpf: unmaskCpf(cpf),
      name,
      birthDate: birthDate?.getTime() || Date.now(),
    };

    try {
      await newClient(clientData);
      navigate('Feedback', {
        title: 'Opa!',
        emoji: 'wink',
        info: 'Cliente salvo com sucesso.',
        buttonTitle: 'Continuar',
        routeName: 'Client',
      } as IFeedbackDataParams);
    } catch (error) {
      navigate('Feedback', {
        title: 'Ops!',
        emoji: 'sad',
        info: error.message,
        buttonTitle: 'Entendi',
        routeName: 'Client',
      } as IFeedbackDataParams);
    }
  }

  async function handleEditClient() {
    const clientData: IClientData = {
      id: client.id,
      cpf: unmaskCpf(cpf),
      name,
      birthDate: birthDate?.getTime() || client.birthDate,
    };

    try {
      await editClient(clientData);
      navigate('Feedback', {
        title: 'Opa!',
        emoji: 'wink',
        info: `${clientData.name} editado com sucesso.`,
        buttonTitle: 'Continuar',
        routeName: 'Client',
      } as IFeedbackDataParams);
    } catch (error) {
      navigate('Feedback', {
        title: 'Ops!',
        emoji: 'sad',
        info: error.message,
        buttonTitle: 'Continuar',
        routeName: 'Client',
      } as IFeedbackDataParams);
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
              <InputMask
                type="cpf"
                placeholder="CPF"
                ref={cpfInputRef}
                value={cpf}
                onChangeText={(cpf) => setCpf(cpf)}
                onSubmitEditing={() => nameInputRef.current?.focus()}
              />
              <Input
                placeholder="Nome"
                autoCompleteType="name"
                ref={nameInputRef}
                value={name}
                onChangeText={(name) => setName(name)}
                maxLength={100}
                onSubmitEditing={toggleDatePicker}
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
                onPress={client.id ? handleEditClient : handleSaveNewClient}
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
