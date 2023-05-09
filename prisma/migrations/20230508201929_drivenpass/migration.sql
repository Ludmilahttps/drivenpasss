/*
  Warnings:

  - The primary key for the `credentials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `title` on the `credentials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - The primary key for the `networks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `title` on the `networks` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,title]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "cardType" AS ENUM ('both', 'credit', 'debit');

-- DropForeignKey
ALTER TABLE "credentials" DROP CONSTRAINT "credentials_userId_fkey";

-- DropForeignKey
ALTER TABLE "networks" DROP CONSTRAINT "networks_userId_fkey";

-- AlterTable
ALTER TABLE "credentials" DROP CONSTRAINT "credentials_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "credentials_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "credentials_id_seq";

-- AlterTable
ALTER TABLE "networks" DROP CONSTRAINT "networks_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "networks_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "networks_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "text" VARCHAR(1000) NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardholderName" TEXT NOT NULL,
    "securityCode" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL DEFAULT false,
    "type" "cardType" NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notes_userId_title_key" ON "notes"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "cards_userId_title_key" ON "cards"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_userId_title_key" ON "credentials"("userId", "title");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "networks" ADD CONSTRAINT "networks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
