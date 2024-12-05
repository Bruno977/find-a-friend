import { prisma } from "@/lib/prisma";
import { FindAllParams, PetsRepository } from "../pets-repository";
import { PetCreateInputProps } from "../@types/PetsProps";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: PetCreateInputProps) {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        about: data.about,
        size: data.size,
        age: data.age,
        energy_level: data.energy_level,
        level_of_independence: data.level_of_independence,
        environment: data.environment,
        org_id: data.org_id,
        petPhotos: {
          createMany: {
            data: data.pet_photos.photos.map((photo) => ({
              photo_url: photo,
            })),
          },
        },
        petRequirements: {
          createMany: {
            data: data.pet_requirements.requirements.map((requirement) => ({
              description: requirement,
            })),
          },
        },
      },
    });
    return pet;
  }
  async findAll(params: FindAllParams) {
    const address = await prisma.address.findMany({
      where: {
        city: params.city,
      },
    });
    const orgs = await prisma.org.findMany({
      where: {
        address_id: { in: address.map((add) => add.id) },
      },
    });
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        energy_level: params.energy_level,
        level_of_independence: params.level_of_independence,
        size: params.size,
        environment: params.environment,
        org_id: { in: orgs.map((org) => org.id) },
      },
    });
    return pets;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    });
    return pet;
  }
}
