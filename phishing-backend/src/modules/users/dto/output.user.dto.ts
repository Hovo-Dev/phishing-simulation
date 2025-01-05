import { User } from '../../database/schemas/user.schema';

export class UserDto {
  id: string;
  email: string;
  full_name: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.full_name = user.full_name;
  }
}
