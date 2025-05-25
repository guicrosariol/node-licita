import { CreateUserUseCase } from '../../../domain/application/use-cases/create-user'
import { InMemoryUserRepository } from '../repositories/in-memory-user-repository'
import { FakeHasher } from '../../core/hasher'
import type { UserRepository } from '../../../domain/application/repositories/user-repository'

interface SharedRepositories {
  sharedUserRepository?: UserRepository
}

export function makeCreateUserUseCase(sharedRepositories?: SharedRepositories) {
  const sharedUserRepository = sharedRepositories?.sharedUserRepository

  const userRepository = sharedUserRepository ?? new InMemoryUserRepository()
  const hasher = new FakeHasher()

  const sut = new CreateUserUseCase(hasher, userRepository)

  return sut
}