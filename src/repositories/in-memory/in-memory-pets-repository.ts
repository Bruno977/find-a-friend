import { Pet, PetPhotos, PetRequirements } from "@prisma/client";
import { randomUUID } from "crypto";
import { FindAllParams, PetsRepository } from "../pets-repository";
import { PetCreateInputProps } from "../@types/PetsProps";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];
  public petPhotos: PetPhotos[] = [];
  public petRequirements: PetRequirements[] = [];

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: PetCreateInputProps) {
    const petId = randomUUID();

    const photosUrls: PetPhotos[] = data.pet_photos.photos.map((photo) => ({
      id: randomUUID(),
      photo_url: photo,
      pet_id: petId,
    }));
    this.petPhotos.push(...photosUrls);

    const requirements: PetRequirements[] =
      data.pet_requirements.requirements.map((requirement) => ({
        id: randomUUID(),
        description: requirement,
        pet_id: petId,
      }));
    this.petRequirements.push(...requirements);

    const pet: Pet = {
      id: petId,
      name: data.name,
      about: data.about,
      size: data.size,
      age: data.age,
      energy_level: data.energy_level,
      level_of_independence: data.level_of_independence,
      environment: data.environment,
      org_id: data.org_id,
    };
    this.pets.push(pet);
    return pet;
  }
  async findAll(params: FindAllParams) {
    const address = this.orgsRepository.addresses.filter(
      (add) => add.city === params.city
    );
    const orgs = this.orgsRepository.items.filter((org) =>
      address.some((add) => add.id === org.address_id)
    );
    const pets = this.pets
      .filter((pet) => orgs.some((org) => org.id === pet.org_id))
      .filter((pet) => (params.age ? params.age === pet.age : true))
      .filter((pet) =>
        params.energy_level ? params.energy_level === pet.energy_level : true
      )
      .filter((pet) =>
        params.environment ? params.environment === pet.environment : true
      )
      .filter((pet) => (params.size ? params.size === pet.size : true))
      .filter((pet) =>
        params.level_of_independence
          ? params.level_of_independence === pet.level_of_independence
          : true
      );
    return pets;
  }
  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id);
    if (!pet) {
      return null;
    }
    return pet;
  }
}
