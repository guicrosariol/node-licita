import { beforeEach, describe, expect, it } from "vitest"
import { CreateBidUseCase } from "../../domain/application/use-cases/create-bid"
import { InMemoryCompanyRepository } from "../repositories/in-memory-company-repository"
import type { CompanyRepository } from "../../domain/application/repositories/company-repository"
import { InMemoryBidRepository } from "../repositories/in-memory-bid-repository"
import { makeCompany } from "../factories/make-company"
import { Bid } from "../../domain/entities/bid"
import { AlreadyExistError } from "../../domain/application/use-cases/errors/already-exist-error"
import { NotFoundError } from "../../domain/application/use-cases/errors/not-found-error"

let sut: CreateBidUseCase
let companyRepository: CompanyRepository
let bidRepository: InMemoryBidRepository

describe('Create bid use case', () => {
  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository()
    bidRepository = new InMemoryBidRepository()

    sut = new CreateBidUseCase(companyRepository, bidRepository)
  })

  it('should be able to create a new bid', async () => {
    const company = makeCompany({}, '1')
    await companyRepository.create(company)

    const result = await sut.execute({
      id: '1',
      companyId: '1',
      pncpId: '1'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Bid)
  })

  it('should not be able to create a bid with same pncpId and companyId', async () => {
    const company = makeCompany({}, '1')
    await companyRepository.create(company)

    await sut.execute({
      id: '1',
      companyId: '1',
      pncpId: '1'
    })

    const result = await sut.execute({
      id: '1',
      companyId: '1',
      pncpId: '1'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistError)
  })

  it('should not be able to create a bid with a company that doesn’t exist', async () => {
    const result = await sut.execute({
      id: '1',
      companyId: '1',
      pncpId: '1'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})