-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('OBJETIVA', 'DISCURSIVA');

-- CreateTable
CREATE TABLE "Questionario" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Questionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "type" "QuestionType" NOT NULL,
    "question" TEXT NOT NULL,
    "choices" TEXT[],
    "correctChoice" TEXT,
    "questionarioId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resposta" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "questionarioId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "resposta" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resposta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Question_questionarioId_idx" ON "Question"("questionarioId");

-- CreateIndex
CREATE INDEX "Resposta_usuarioId_idx" ON "Resposta"("usuarioId");

-- CreateIndex
CREATE INDEX "Resposta_questionarioId_idx" ON "Resposta"("questionarioId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "Questionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "Questionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
