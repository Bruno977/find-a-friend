import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { describe, it, beforeEach, expect } from "vitest";
import { petBodyMock } from "./__tests__/mockPet";
import { randomUUID } from "node:crypto";
import { PetDetailsUseCase } from "./pet-details";
import { PetDoesNotExistError } from "./errors/pet-does-not-exist-error";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: PetDetailsUseCase;
describe("Pet Details Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new PetDetailsUseCase(petsRepository);
  });
  it("should return a pet", async () => {
    const pet = await petsRepository.create(
      petBodyMock({ orgId: randomUUID() })
    );
    const response = await sut.execute(pet.id);
    expect(response.pet).toEqual(pet);
  });
  it("should error return a pet", async () => {
    expect(async () => await sut.execute("invalid id")).rejects.toBeInstanceOf(
      PetDoesNotExistError
    );
  });
});
