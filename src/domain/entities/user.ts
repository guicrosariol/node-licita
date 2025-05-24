import { Entity } from "../../core/entities/entity";

export interface UserProps {
  name: string;
  email: string;
  passwordHash: string;
}

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: string,) {
    return new User(props, id)
  };
}
