/*
  Warnings:

  - You are about to drop the `Bid` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BidNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_companyId_fkey";

-- DropForeignKey
ALTER TABLE "BidNote" DROP CONSTRAINT "BidNote_bidId_fkey";

-- DropForeignKey
ALTER TABLE "BidNote" DROP CONSTRAINT "BidNote_companyId_fkey";

-- DropForeignKey
ALTER TABLE "BidNote" DROP CONSTRAINT "BidNote_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "userCompany" DROP CONSTRAINT "userCompany_companyId_fkey";

-- DropForeignKey
ALTER TABLE "userCompany" DROP CONSTRAINT "userCompany_userId_fkey";

-- DropTable
DROP TABLE "Bid";

-- DropTable
DROP TABLE "BidNote";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "userCompany";

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "maximumUsers" DECIMAL(65,30) NOT NULL,
    "currentUsers" DECIMAL(65,30) NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_companies" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "user_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bids" (
    "id" SERIAL NOT NULL,
    "companyId" TEXT NOT NULL,
    "pncpId" TEXT NOT NULL,
    "isManaged" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bid_notes" (
    "id" SERIAL NOT NULL,
    "bidId" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "bid_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_companies" ADD CONSTRAINT "user_companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_companies" ADD CONSTRAINT "user_companies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid_notes" ADD CONSTRAINT "bid_notes_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "bids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid_notes" ADD CONSTRAINT "bid_notes_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid_notes" ADD CONSTRAINT "bid_notes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
