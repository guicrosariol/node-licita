import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../repositories/in-memory-user-repository'
import { CreateCompanyUseCase } from '../../src/domain/application/use-cases/create-company'
import type { CompanyRepository } from '../../src/domain/application/repositories/company-repository'
import type { UserRepository } from '../../src/domain/application/repositories/user-repository'
import { InMemoryCompanyRepository } from '../repositories/in-memory-company-repository'
import { makeUser } from '../factories/make-user'
import { Company } from '../../src/domain/entities/company'
import { AlreadyExistError } from '../../src/domain/application/use-cases/errors/already-exist-error'

let sut: CreateCompanyUseCase
let companyRepository: CompanyRepository
let userRepository: UserRepository

describe('Create company use case', () => {
  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository()
    userRepository = new InMemoryUserRepository()

    sut = new CreateCompanyUseCase(companyRepository, userRepository)
  })

  it('should be able to create a new company', async () => {
    const user = makeUser({}, '1')
    await userRepository.create(user)

    const result = await sut.execute({
      ownerId: '1',
      name: 'example',
      cnpj: 'example',
      email: 'example',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Company)
  })

  it('should not be able to create a company with same cnpj or email', async () => {
    const user = makeUser({}, '1')
    await userRepository.create(user)

    await sut.execute({
      ownerId: '1',
      name: 'Company A',
      cnpj: '123456789',
      email: 'company@example.com',
    })

    const resultWithSameCnpj = await sut.execute({
      ownerId: '1',
      name: 'Company B',
      cnpj: '123456789',
      email: 'unique@example.com',
    })

    const resultWithSameEmail = await sut.execute({
      ownerId: '1',
      name: 'Company C',
      cnpj: '987654321',
      email: 'company@example.com',
    })

    expect(resultWithSameCnpj.isLeft()).toBe(true)
    expect(resultWithSameCnpj.value).toBeInstanceOf(AlreadyExistError)

    expect(resultWithSameEmail.isLeft()).toBe(true)
    expect(resultWithSameEmail.value).toBeInstanceOf(AlreadyExistError)
  })
})