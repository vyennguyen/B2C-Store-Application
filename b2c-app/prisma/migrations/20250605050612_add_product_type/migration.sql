-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('KEYBOARD', 'KEYCAP', 'SWITCH');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "categories" TEXT[],
    "images" TEXT[],
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "ratingValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyboard" (
    "productId" INTEGER NOT NULL,
    "switchType" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "layout" TEXT NOT NULL,
    "backlight" BOOLEAN NOT NULL,

    CONSTRAINT "Keyboard_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Keycap" (
    "productId" INTEGER NOT NULL,
    "material" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "compatibility" TEXT[],

    CONSTRAINT "Keycap_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Switch" (
    "productId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Switch_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Keyboard" ADD CONSTRAINT "Keyboard_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keycap" ADD CONSTRAINT "Keycap_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Switch" ADD CONSTRAINT "Switch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
