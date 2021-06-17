import React from 'react';
import {
  ModalProps,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import { Container, IconContainer } from './styles';

import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import Feather from '@expo/vector-icons/Feather';

interface IAccountModalProps extends ModalProps {
  handleCloseModal: () => void;
}

export function AccountModal({ handleCloseModal, ...rest }: IAccountModalProps) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPressOut={Keyboard.dismiss}>
        <Modal {...rest}>
          <Container>
            <IconContainer onPress={handleCloseModal}>
              <Feather name="x" color="red" size={24} />
            </IconContainer>

            <Input placeholder="Número da conta" />
            <Input placeholder="Data de abertura" />
            <Input placeholder="Senha" />
            <Input placeholder="Confirme a senha" />
            <Button title="Salvar" />
          </Container>
        </Modal>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
