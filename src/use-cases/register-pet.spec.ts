import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "./register-pet";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { PetCreateInputProps } from "@/repositories/@types/PetsProps";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgDoesNotExistError } from "./errors/org-does-not-exist-error";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterPetUseCase;

describe("Register pet use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new RegisterPetUseCase(petsRepository, orgsRepository);
  });
  it("should successfully register a pet when the organization exists", async () => {
    const orgBody = {
      email: "johndoe@example.com",
      password: "123456",
      phone: "999999999",
      responsible: "John Doe",
      address: {
        city: "San Francisco",
        state: "CA",
        street: "San Francisco Street",
        zip_code: "123456",
      },
    };
    const org = await orgsRepository.create(orgBody);
    const petBody: PetCreateInputProps = {
      name: "Meu Pet",
      about: "Sobre meu Pet",
      size: "SMALL",
      age: "ADULT",
      energy_level: "HIGH",
      level_of_independence: "HIGH",
      environment: "APARTMENT",
      org_id: org.id,
      pet_photos: {
        photos: ["photo1", "photo2"],
      },
      pet_requirements: {
        requirements: ["Requirements 1", "Requirements 2"],
      },
    };
    const pet = await sut.execute(petBody);
    expect(pet).toEqual(
      expect.objectContaining({
        pet: expect.objectContaining({
          name: "Meu Pet",
        }),
      })
    );
  });
  it("should throw OrgDoesNotExistError when the organization does not exist", async () => {
    const petBody: PetCreateInputProps = {
      name: "Meu Pet",
      about: "Sobre meu Pet",
      size: "SMALL",
      age: "ADULT",
      energy_level: "HIGH",
      level_of_independence: "HIGH",
      environment: "APARTMENT",
      org_id: "123",
      pet_photos: {
        photos: ["photo1", "photo2"],
      },
      pet_requirements: {
        requirements: ["Requirements 1", "Requirements 2"],
      },
    };
    expect(async () => await sut.execute(petBody)).rejects.toBeInstanceOf(
      OrgDoesNotExistError
    );
  });
});
