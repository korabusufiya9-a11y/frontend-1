// src/Pages/types.ts

export interface IAccount {
  _id?: string;
  userId: string;
  accountName: string;
  accountType: string;
  currency: string;
  balance: number;
  isActive: boolean;
}