import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import { ThemeProvider } from 'styled-components';
import { PrimaryTheme } from './src/styles/theme/primaryTheme';

import {
  useFonts,
  Ubuntu_400Regular,
  Ubuntu_700Bold,
  Ubuntu_400Regular_Italic,
} from '@expo-google-fonts/ubuntu';

import { Client } from './src/pages/Client';

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
    Ubuntu_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }
  return (
    <ThemeProvider theme={PrimaryTheme}>
      <Client />
      <StatusBar style="light" backgroundColor="#F2822C" />
    </ThemeProvider>
  );
}
