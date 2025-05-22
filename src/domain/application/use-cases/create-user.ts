import { left, right, type Either } from "../../../core/either";
import { User, UserProps } from "../../entities/user";
import type { UserRepository } from "../repositories/user-repository";
import { AlreadyExistError } from "./errors/already-exist-error";

interface CreateUserRequest {
  name: string,
  email: string,
  cnpj: string
  password: string
}

type CreateUserUseCaseResponse = Either<AlreadyExistError, User>

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository
  ) { };

  async execute({
    name,
    email,
    cnpj,
    password
  }: CreateUserRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findByEmailAndCnpj({
      email,
      cnpj
    })

    if (userAlreadyExists) {
      return left(new AlreadyExistError())
    }

    const passwordHash = password //TODO:

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