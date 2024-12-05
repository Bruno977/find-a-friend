import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetDetailsUseCase } from "../pet-details";
export function makePetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const petDetailsUseCase = new PetDetailsUseCase(petsRepository);
  return petDetailsUseCase;
}
