import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from '../../src/domain/application/use-cases/create-user'
import type { UserRepository } from '../../src/domain/application/repositories/user-repository'
import type { Hasher } from '../../src/core/hasher'
import { InMemoryUserRepository } from '../repositories/in-memory-user-repository'
import { FakeHasher } from '../core/hasher'
import { User } from '../../src/domain/entities/user'
import { AlreadyExistError } from '../../src/domain/application/use-cases/errors/already-exist-error'

let sut: CreateUserUseCase
let userRepository: UserRepository
let hasher: Hasher

describe('Create user user case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    hasher = new FakeHasher()

    sut = new CreateUserUseCase(hasher, userRepository)
  })

  it('should be able to create a new user', async () => {
    const result = await sut.execute({
      id: '1',
      email: 'example@example.com',
      name: 'example',
      password: 'example'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(User)
  })

  it('should not be able to create a user with same email', async () => {
    await sut.execute({
      id: '1',
      email: 'example@example.com',
      name: 'example',
      password: 'example'
    })

    const result = await sut.execute({
      id: '1',
      email: 'example@example.com',
      name: 'example',
      password: 'example'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistError)
  })
})