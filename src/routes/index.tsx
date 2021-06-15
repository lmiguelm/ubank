import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigation } from './stack.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
