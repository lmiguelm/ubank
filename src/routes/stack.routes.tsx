import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Client } from '../pages/Client';
import { Account } from '../pages/Account';
import { RegisterClient } from '../pages/RegisterClient';
import { Deposit } from '../pages/Deposit';
import { AccountStatement } from '../pages/AccountStatement';
import { AccountStatementDetail } from '../pages/AccountStatementDetail';
import { Feedback } from '../pages/Feedback';

export function StackNavigation() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="Client" component={Client} />
      <Screen name="Account" component={Account} />
      <Screen name="RegisterClient" component={RegisterClient} />
      <Screen name="Deposit" component={Deposit} />

      <Screen name="AccountStatement" component={AccountStatement} />
      <Screen name="AccountStatementDetail" component={AccountStatementDetail} />

      <Screen name="Feedback" component={Feedback} />
    </Navigator>
  );
}
