import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Client } from '../pages/Client';

export function StackNavigation() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="Client" component={Client} />
    </Navigator>
  );
}
