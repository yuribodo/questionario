/*
  Warnings:

  - Added the required column `userId` to the `Questionario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questionario" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Resposta" ALTER COLUMN "usuarioId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Questionario_userId_idx" ON "Questionario"("userId");

-- AddForeignKey
ALTER TABLE "Questionario" ADD CONSTRAINT "Questionario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
