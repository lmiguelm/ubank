import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Keyboard, View, TextInput } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Picker, { Event } from '@react-native-community/datetimepicker';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/native';
import { TextMaskInstance } from 'react-native-masked-text';

import { Header, Subtitle, TextButton, Title, Button, ButtonContainer, Icon } from './styles';

import { Input } from '../../components/Input';
import { InputMask } from '../../components/Input/Mask';
import { Button as ComponentButton } from '../../components/Button';

import { delay } from '../../utils/delay';

interface IHeadeProps {
  title: 'Clientes' | 'Contas' | 'Extrato';
  subtitle?: string;
  onNew?: () => void;
  onFilter: (callback: string) => void;
  onRefresh: () => void;
}

export function PrimaryHeader({ title, subtitle, onNew, onFilter, onRefresh }: IHeadeProps) {
  const { goBack } = useNavigation();

  const inputRef = useRef<TextInput>(null);
  const inputRefMask = useRef<TextMaskInstance>(null);

  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>('');
  const [enabledButton, setEnabledButton] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    if (filterValue?.length !== 0) {
      setEnabledButton(true);
    } else {
      setEnabledButton(false);
    }
  }, [filterValue]);

  function toggleFilter() {
    setActiveFilter((oldstate) => !oldstate);
    delay().then(() => {
      inputRef.current?.focus();
      inputRefMask.current?.getElement().focus();
    });
  }

  function handleFilter() {
    setActiveFilter(false);
    onFilter(filterValue as string);
    setFilterValue('');
    Keyboard.dismiss();
  }

  function handleOpemDatePicker() {
    setShowDatePicker(true);
  }

  function handleChangePicker(_: Event, dateTime: Date | undefined) {
    setShowDatePicker(false);
    if (dateTime) {
      onFilter(dateTime.getTime().toString());
    }
  }

  return (
    <>
      <Header style={{ marginTop: getStatusBarHeight() }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {title !== 'Clientes' && (
              <ButtonContainer onPress={goBack}>
                <Icon name="arrow-left" />
              </ButtonContainer>
            )}
            <Title>{title}</Title>
          </View>
          <Subtitle>{subtitle}</Subtitle>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {title !== 'Extrato' && (
            <Button onPress={onNew}>
              <Feather name="plus" size={20} color="#F2822C" />
              <TextButton>{title == 'Clientes' ? 'Novo' : 'Nova'}</TextButton>
            </Button>
          )}

          <Button
            onPress={title !== 'Extrato' ? toggleFilter : handleOpemDatePicker}
            style={activeFilter ? { backgroundColor: '#0D5794' } : {}}
          >
            <Feather name="search" size={20} color={activeFilter ? 'white' : '#F2822C'} />
            <TextButton style={activeFilter ? { color: 'white' } : { color: '#F2822C' }}>
              Filtrar
            </TextButton>
          </Button>

          <Button onPress={onRefresh}>
            <Feather name="filter" size={20} color="#F2822C" />
            <TextButton>Remover filtros</TextButton>
          </Button>
        </ScrollView>

        {activeFilter && (
          <>
            {title === 'Contas' ? (
              <InputMask
                ref={inputRefMask}
                value={filterValue}
                type="custom"
                options={{
                  mask: '99999-9',
                }}
                onChangeText={(value) => setFilterValue(value)}
                placeholder="Número da conta"
                keyboardType="numeric"
                style={{ marginVertical: 10, alignSelf: 'center', fontSize: 18, width: '100%' }}
                onSubmitEditing={handleFilter}
              />
            ) : (
              <Input
                ref={inputRef}
                value={filterValue}
                onChangeText={(value) => setFilterValue(value)}
                placeholder="Nome"
                style={{ marginVertical: 10, alignSelf: 'center', fontSize: 18, width: '100%' }}
                onSubmitEditing={handleFilter}
              />
            )}
            <ComponentButton
              enabled={enabledButton}
              onPress={handleFilter}
              style={
                enabledButton
                  ? { marginBottom: 30, alignSelf: 'center', width: '100%' }
                  : { marginBottom: 30, alignSelf: 'center', width: '100%', opacity: 0.8 }
              }
              title="Buscar"
            />
          </>
        )}
      </Header>

      {showDatePicker && (
        <Picker
          mode="date"
          maximumDate={new Date()}
          value={date ?? new Date()}
          onChange={handleChangePicker}
          locale="pt-BR"
        />
      )}
    </>
  );
}
