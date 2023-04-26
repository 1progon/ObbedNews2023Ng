import type {User} from "./User";

export interface Account {
  id: number;
  guid: string;

  email: string;
  password: string;

  token?: string;
  tokenExpire?: string;

  user: User;
  userId: number;
}
