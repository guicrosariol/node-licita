import { CreateUserUseCase } from "../../domain/application/use-cases/create-user";
import { HasherString } from "../utils/hasher";
import { PrismaUserRepository } from "../prisma/repositories/prisma-user-repository";

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const hasherString = new HasherString()
  return new CreateUserUseCase(hasherString, userRepository)
}