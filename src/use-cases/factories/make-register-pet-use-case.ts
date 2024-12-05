import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../register-pet";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
export function makeRegisterPetUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();
  const registerPetsUseCase = new RegisterPetUseCase(
    petsRepository,
    orgsRepository
  );
  return registerPetsUseCase;
}
