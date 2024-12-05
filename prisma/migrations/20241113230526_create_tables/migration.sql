/*
  Warnings:

  - Added the required column `about` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "age" AS ENUM ('YOUNG', 'ADULT', 'OLD');

-- CreateEnum
CREATE TYPE "energyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "levelOfIndependence" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "environment" AS ENUM ('APARTMENT', 'HOUSE', 'GARDEN');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "age" "age" NOT NULL DEFAULT 'YOUNG',
ADD COLUMN     "energy_level" "energyLevel" NOT NULL DEFAULT 'LOW',
ADD COLUMN     "environment" "environment" NOT NULL DEFAULT 'APARTMENT',
ADD COLUMN     "level_of_independence" "levelOfIndependence" NOT NULL DEFAULT 'LOW',
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "size" "size" NOT NULL DEFAULT 'SMALL';

-- CreateTable
CREATE TABLE "pet_photos" (
    "id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_requirements" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_password_hash_key" ON "orgs"("password_hash");

-- AddForeignKey
ALTER TABLE "pet_photos" ADD CONSTRAINT "pet_photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_requirements" ADD CONSTRAINT "pet_requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
