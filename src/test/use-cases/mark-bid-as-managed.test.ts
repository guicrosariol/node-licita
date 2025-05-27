import { beforeEach, describe, expect, it } from "vitest"
import { MarkBidAsManagedUseCase } from "../../domain/application/use-cases/mark-bid-as-managed"
import type { CompanyRepository } from "../../domain/application/repositories/company-repository"
import type { BidRepository } from "../../domain/application/repositories/bid-repository"
import { InMemoryCompanyRepository } from "../repositories/in-memory-company-repository"
import { InMemoryBidRepository } from "../repositories/in-memory-bid-repository"
import { makeCompany } from "../factories/make-company"
import { makeBid } from "../factories/make-bid"
import { ActionAlreadyPerformedError } from "../../domain/application/use-cases/errors/action-already-performed-error"

let sut: MarkBidAsManagedUseCase
let companyRepository: CompanyRepository
let bidRepository: BidRepository

describe('Mark bid as managed use case', () => {
  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository()
    bidRepository = new InMemoryBidRepository()

    sut = new MarkBidAsManagedUseCase(companyRepository, bidRepository)
  })

  it('should be able to mark bid as managed', async () => {
    const company = makeCompany({}, '1')
    await companyRepository.create(company)

    const bid = makeBid({}, '1')
    await bidRepository.create(bid)

    const result = await sut.execute({
      bidId: '1',
      companyId: '1'
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not allow marking bid as managed if company does not own the bid', async () => {
    const bid = makeBid({ companyId: '2' }, '1')
    await bidRepository.create(bid)

    const result = await sut.execute({
      bidId: '1',
      companyId: '1'
    })

    expect(result.isLeft()).toBe(true)
  })

  it('should not allow marking bid as managed if it is already marked', async () => {
    const company = makeCompany({}, '1')
    await companyRepository.create(company)

    const bid = makeBid({}, '1')
    await bidRepository.create(bid)

    await sut.execute({
      bidId: '1',
      companyId: '1'
    })

    const result = await sut.execute({
      bidId: '1',
      companyId: '1'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ActionAlreadyPerformedError)
  })
})