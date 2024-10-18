-- CreateTable
CREATE TABLE "cars" (
    "id" BIGSERIAL NOT NULL,
    "plate" VARCHAR(15) NOT NULL,
    "manufacture_id" BIGSERIAL NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "rentPerDay" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "availableAt" TIMESTAMP(6) NOT NULL,
    "transmission" VARCHAR(20) NOT NULL,
    "available" BOOLEAN NOT NULL,
    "type_id" BIGSERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "options" JSON,
    "specs" JSON,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufactures" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "establishment" INTEGER NOT NULL,
    "office" VARCHAR(100),
    "country" VARCHAR(50) NOT NULL,
    "logo" VARCHAR(255),

    CONSTRAINT "manufactures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" BIGSERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "description" TEXT,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_manufacture_id_fkey" FOREIGN KEY ("manufacture_id") REFERENCES "manufactures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
