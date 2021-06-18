import { IClientData } from './IClient';

export interface IAccountData {
  id: string;
  number: string;
  balance: number;
  createdAt: string;
  status: boolean;
  password: string;
  clientId: string;
}

export interface IAccountDataParams {
  client: IClientData;
}
