import { beforeEach, describe, expect, it } from "vitest"
import type { BidRepository } from "../../src/domain/application/repositories/bid-repository"
import type { CompanyRepository } from "../../src/domain/application/repositories/company-repository"
import { InMemoryBidRepository } from "../repositories/in-memory-bid-repository"
import { InMemoryCompanyRepository } from "../repositories/in-memory-company-repository"
import { makeCompany } from "../factories/make-company"
import { makeBid } from "../factories/make-bid"
import { CreateBidNoteUseCase } from "../../src/domain/application/use-cases/create-bid-note"
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository"
import type { UserRepository } from "../../src/domain/application/repositories/user-repository"
import { BidNote } from "../../src/domain/entities/bid-note"
import { NotFoundError } from "../../src/domain/application/use-cases/errors/not-found-error"
import { makeUser } from "../factories/make-user"

let sut: CreateBidNoteUseCase
let companyRepository: CompanyRepository
let bidRepository: BidRepository
let userRepository: UserRepository

describe('Create bid note use case', () => {
  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository()
    bidRepository = new InMemoryBidRepository()
    userRepository = new InMemoryUserRepository()

    sut = new CreateBidNoteUseCase(bidRepository, companyRepository, userRepository)
  })

  it('should be able to create a new bid note', async () => {
    const user = makeUser({}, '1')
    await userRepository.create(user)

    const company = makeCompany({}, '1')
    await companyRepository.create(company)

    const bid = makeBid({}, '1')
    await bidRepository.create(bid)

    const result = await sut.execute({
      bidId: '1',
      ownerId: '1',
      companyId: '1',
      content: 'example'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(BidNote)
  })

  it('should not be able to create a bid note with a company that doesn’t exist', async () => {
    const bid = makeBid()
    await bidRepository.create(bid)

    const result = await sut.execute({
      ownerId: '1',
      bidId: '1',
      companyId: '1',
      content: 'example'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  it('should not be able to create a bid note with a bid that doesn’t exist', async () => {
    const company = makeCompany()
    await companyRepository.create(company)

    const result = await sut.execute({
      ownerId: '1',
      bidId: '1',
      companyId: '1',
      content: 'example'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})