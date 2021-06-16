import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Client } from '../pages/Client';
import { RegisterClient } from '../pages/RegisterClient';
import { Feedback } from '../pages/Feedback';

export function StackNavigation() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="Client" component={Client} />
      <Screen name="RegisterClient" component={RegisterClient} />

      <Screen name="Feedback" component={Feedback} />
    </Navigator>
  );
}
