import { beforeEach, describe, expect, it } from 'vitest'
import { AssignUserToCompanyUseCase } from '../../src/domain/application/use-cases/assign-user-to-company'
import type { CompanyRepository } from '../../src/domain/application/repositories/company-repository'
import type { UserRepository } from '../../src/domain/application/repositories/user-repository'
import { InMemoryCompanyRepository } from '../repositories/in-memory-company-repository'
import { InMemoryUserRepository } from '../repositories/in-memory-user-repository'
import { makeUser } from '../factories/make-user'
import { makeCompany } from '../factories/make-company'
import { UserCompany } from '../../src/domain/entities/user-company'

let sut: AssignUserToCompanyUseCase
let companyRepository: CompanyRepository
let userRepository: UserRepository

describe('Assign user to company use case', () => {
  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository()
    userRepository = new InMemoryUserRepository()

    sut = new AssignUserToCompanyUseCase(companyRepository, userRepository)
  })

  it('should be able to assign user to company', async () => {
    const user = makeUser({}, '1')
    await userRepository.create(user)

    const company = makeCompany({}, '1')
    await companyRepository.create(company)

    const result = await sut.execute({
      userId: '1',
      companyId: '1'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(UserCompany)
  })
})