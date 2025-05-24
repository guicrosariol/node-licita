import { beforeEach, describe, expect, it } from 'vitest'
import { User } from '../domain/entities/user'
import { makeCreateUserUseCase } from './factories/make-create-user'
import { AlreadyExistError } from '../domain/application/use-cases/errors/already-exist-error'

let sut: ReturnType<typeof makeCreateUserUseCase>

describe('Create User Use Case', () => {
  beforeEach(() => {
    sut = makeCreateUserUseCase()
  })

  it('should be able to create a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(User)
  })

  it('should not be able to create a user with same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistError)
  })
})