import { left, right, type Either } from "../../../core/either";
import { Hasher } from "../../../core/hasher";
import { User } from "../../entities/user";
import type { UserRepository } from "../repositories/user-repository";
import { AlreadyExistError } from "./errors/already-exist-error";

interface CreateUserRequest {
  name: string,
  email: string,
  cnpj: string
  password: string
}

type CreateUserResponse = Either<AlreadyExistError, User>

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository
  ) { };

  async execute({
    name,
    email,
    cnpj,
    password
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.userRepository.findByEmailAndCnpj({
      email,
      cnpj
    })

    if (userAlreadyExists) {
      return left(new AlreadyExistError())
    }

    const passwordHash = await Hasher.hash(password, 6);

    const userToCreate = User.create({
      name,
      email,
      cnpj,
      passwordHash
    })

    const createdUser = await this.userRepository.create(userToCreate)

    return right(createdUser)
  };
};