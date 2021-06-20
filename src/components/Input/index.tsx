import React from 'react';
import { TextInputProps, TextInput } from 'react-native';

export const Input = React.forwardRef<TextInput, TextInputProps>((props, ref) => {
  return (
    <TextInput
      ref={ref}
      {...props}
      style={[
        {
          height: 77,
          width: 300,
          backgroundColor: 'white',
          borderRadius: 10,
          marginBottom: 10,
          paddingLeft: 30,
          fontSize: 24,
          fontFamily: 'Ubuntu_400Regular',
        },
        props.style,
      ]}
    />
  );
});
