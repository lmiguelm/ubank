import { IAccountData } from './IAccount';
import { IClientData } from './IClient';

export interface IDepositDataParams {
  account: IAccountData;
  client: IClientData;
}

export interface IDepositData {
  id: string;
  value: number;
  description: string;
  accountId: string;
  createdAt: string;
}
