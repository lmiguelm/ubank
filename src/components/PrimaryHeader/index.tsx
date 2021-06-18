import React, { useState, useEffect } from 'react';
import { ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Header, Subtitle, TextButton, Title, Button } from './styles';

import { Input } from '../../components/Input';
import { Button as ComponentButton } from '../../components/Button';
import Feather from '@expo/vector-icons/Feather';

interface IHeadeProps {
  title: 'Clientes' | 'Contas' | 'Extrato';
  subtitle?: string;
  onNew: () => void;
  onFilter: (callback: string) => void;
  onRefresh: () => void;
}

export function PrimaryHeader({ title, subtitle, onNew, onFilter, onRefresh }: IHeadeProps) {
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>('');
  const [enabledButton, setEnabledButton] = useState<boolean>(false);

  useEffect(() => {
    if (filterValue?.length !== 0) {
      setEnabledButton(true);
    } else {
      setEnabledButton(false);
    }
  }, [filterValue]);

  function toggleFilter() {
    setActiveFilter((oldstate) => !oldstate);
  }

  function handleFilter() {
    onFilter(filterValue as string);
    setFilterValue('');
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPressOut={Keyboard.dismiss}>
      <Header style={{ marginTop: getStatusBarHeight() }}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {title !== 'Extrato' && (
            <Button onPress={onNew}>
              <Feather name="plus" size={20} color="#F2822C" />
              <TextButton>{title == 'Clientes' ? 'Novo' : 'Nova'}</TextButton>
            </Button>
          )}

          <Button onPress={toggleFilter} style={activeFilter ? { backgroundColor: '#0D5794' } : {}}>
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
            <Input
              value={filterValue}
              onChangeText={(value) => setFilterValue(value)}
              placeholder={title == 'Clientes' ? 'Informe o nome' : 'Informe o número'}
              style={{ marginVertical: 10, alignSelf: 'center', fontSize: 18, width: '100%' }}
            />
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
    </TouchableWithoutFeedback>
  );
}
