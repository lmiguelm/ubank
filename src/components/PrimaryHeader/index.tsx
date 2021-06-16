import React from 'react';
import { ScrollView } from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Header, Subtitle, TextButton, Title, Button } from './styles';

interface IHeadeProps {
  title: string;
  subtitle?: string;
  buttons?: Array<{
    title: string;
  }>;
}

export function PrimaryHeader({ title, subtitle, buttons }: IHeadeProps) {
  return (
    <Header style={{ marginTop: getStatusBarHeight() }}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>

      {buttons && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {buttons.map((button, index) => (
            <Button key={index}>
              <TextButton>{button.title}</TextButton>
            </Button>
          ))}
        </ScrollView>
      )}
    </Header>
  );
}
