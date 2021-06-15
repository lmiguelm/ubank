import 'styled-components/native';

import { PrimaryTheme } from './theme/primaryTheme';

export type Theme = typeof PrimaryTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
