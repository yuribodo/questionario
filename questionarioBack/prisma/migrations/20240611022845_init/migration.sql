-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('objetiva', 'discursiva');

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

-- CreateIndex
CREATE INDEX "Question_questionarioId_idx" ON "Question"("questionarioId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "Questionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
