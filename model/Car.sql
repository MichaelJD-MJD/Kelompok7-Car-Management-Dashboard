CREATE TABLE
    "cars" (
        "id" BIGSERIAL PRIMARY KEY,
        "plate" varchar(15) NOT NULL,
        "manufacture_id" bigserial NOT NULL,
        "model" varchar(50) NOT NULL,
        "image" varchar(255) NOT NULL,
        "rentPerDay" integer NOT NULL,
        "capacity" integer NOT NULL,
        "description" text NOT NULL,
        "availableAt" timestamp NOT NULL,
        "transmission" varchar(20) NOT NULL,
        "available" boolean NOT NULL,
        "type_id" bigserial NOT NULL,
        "year" integer NOT NULL,
        "options" json,
        "specs" json
    );

CREATE TABLE
    "manufactures" (
        "id" BIGSERIAL PRIMARY KEY,
        "name" varchar(255) NOT NULL,
        "description" text,
        "establishment" integer NOT NULL,
        "office" varchar(100),
        "country" varchar(50) NOT NULL,
        "logo" varchar(255)
    );

CREATE TABLE
    "types" (
        "id" BIGSERIAL PRIMARY KEY,
        "type" varchar(50) NOT NULL,
        "description" text
    );

ALTER TABLE "cars" ADD FOREIGN KEY ("manufacture_id") REFERENCES "manufactures" ("id");

ALTER TABLE "cars" ADD FOREIGN KEY ("type_id") REFERENCES "types" ("id");