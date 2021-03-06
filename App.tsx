import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import AppLoading from 'expo-app-loading';

import { ThemeProvider } from 'styled-components';
import { PrimaryTheme } from './src/styles/theme/primaryTheme';

import {
  useFonts,
  Ubuntu_400Regular,
  Ubuntu_700Bold,
  Ubuntu_400Regular_Italic,
} from '@expo-google-fonts/ubuntu';

import { Routes } from './src/routes';

import { ClientProvider } from './src/contexts/ClientContext';
import { AccountProvider } from './src/contexts/AccountContext';
import { DepositProvider } from './src/contexts/DepositContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
    Ubuntu_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={PrimaryTheme}>
      <ClientProvider>
        <AccountProvider>
          <DepositProvider>
            <Routes />
          </DepositProvider>
        </AccountProvider>
      </ClientProvider>
      <StatusBar style="light" backgroundColor="#F2822C" />
    </ThemeProvider>
  );
}
