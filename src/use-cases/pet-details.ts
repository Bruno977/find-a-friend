import { PetsRepository } from "@/repositories/pets-repository";
import { PetDoesNotExistError } from "./errors/pet-does-not-exist-error";

export class PetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute(petId: string) {
    const pet = await this.petsRepository.findById(petId);
    if (!pet) {
      throw new PetDoesNotExistError();
    }
    return { pet };
  }
}
