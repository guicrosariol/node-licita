import { CreateUserUseCase } from '../../domain/application/use-cases/create-user'
import { InMemoryUserRepository } from '../repositories/in-memory-user-repository'
import { FakeHasher } from '../core/hasher'

export function makeCreateUserUseCase() {
  const userRepository = new InMemoryUserRepository()
  const hasher = new FakeHasher()
  const sut = new CreateUserUseCase(hasher, userRepository)

  return sut
}