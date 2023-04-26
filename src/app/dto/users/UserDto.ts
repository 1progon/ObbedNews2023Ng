import type {UserType} from "../../enums/users/UserType";

export interface UserDto {
  guid: string;
  email: string;
  userType: UserType;
  token: string;
  hasPremium: boolean;
}
