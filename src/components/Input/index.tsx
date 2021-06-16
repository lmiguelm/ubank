import React from 'react';
import { TextInputProps } from 'react-native';
import { TextInputMaskOptionProp, TextInputMaskTypeProp } from 'react-native-masked-text';

import { InputMask, Input as DefaultInput } from './styles';

interface IInputProps extends TextInputProps {
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
}

export function Input({ type, options, ...rest }: IInputProps) {
  if (type) {
    return <InputMask {...rest} type={type} options={options} />;
  } else {
    return <DefaultInput {...rest} />;
  }
}
