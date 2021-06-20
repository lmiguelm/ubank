import React from 'react';
import { TextInputMaskProps } from 'react-native-masked-text';

import { InputMask as Input } from './styles';

export const InputMask = React.forwardRef<any, TextInputMaskProps>((props, ref) => {
  return <Input ref={ref} {...props} />;
});
