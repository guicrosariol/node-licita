import { left, right, type Either } from "../../../core/either";
import type { Hasher } from "../../../core/hasher";
import { User } from "../../entities/user";
import type { UserRepository } from "../repositories/user-repository";
import { AlreadyExistError } from "./errors/already-exist-error";

interface CreateUserRequest {
  id?: string,
  name: string,
  email: string,
  password: string
}

type CreateUserResponse = Either<AlreadyExistError, User>

export class CreateUserUseCase {
  constructor(
    private hasher: Hasher,
    private userRepository: UserRepository
  ) { };

  async execute({
    id,
    name,
    email,
    password
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new AlreadyExistError())
    }

    const passwordHash = await this.hasher.hash(password, 6);

    const userToCreate = User.create({
      name,
      email,
      passwordHash
    }, id)

    const createdUser = await this.userRepository.create(userToCreate)

    return right(createdUser)
  };
};