import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Client } from '../pages/Client';
import { RegisterClient } from '../pages/RegisterClient';

export function StackNavigation() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="Client" component={Client} />
      <Screen name="RegisterClient" component={RegisterClient} />
    </Navigator>
  );
}
