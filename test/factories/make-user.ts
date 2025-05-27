import { User, type UserProps } from "../../src/domain/entities/user";

export function makeUser(override: Partial<UserProps> = {}, id?: string) {
    return User.create({
    name: 'example',
    email: 'example@example.com',
    passwordHash: 'example',
    ...override,
  }, id)
}


