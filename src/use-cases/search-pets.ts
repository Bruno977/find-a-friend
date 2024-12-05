import { FindAllParams, PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface SearchPetsUseCaseResponseProps {
  pets: Pet[];
}
export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute({
    city,
    age,
    energy_level,
    environment,
    level_of_independence,
    size,
  }: FindAllParams): Promise<SearchPetsUseCaseResponseProps> {
    const pets = await this.petsRepository.findAll({
      city: city,
      age: age,
      energy_level,
      environment,
      level_of_independence,
      size,
    });
    return { pets };
  }
}
