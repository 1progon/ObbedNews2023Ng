import type {User} from "./User";
import {UserType} from "../enums/users/UserType";

export interface Account {
  id: number;
  guid: string;

  email: string;
  password: string;

  token?: string;
  tokenExpire?: string;

  user: User;
  userId: number;

  userType: UserType;
}
