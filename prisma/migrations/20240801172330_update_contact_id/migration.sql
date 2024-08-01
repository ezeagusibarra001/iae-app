/*
  Warnings:

  - The primary key for the `Contact` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "contactoid" SET DEFAULT '',
ADD CONSTRAINT "Contact_pkey" PRIMARY KEY ("id");
