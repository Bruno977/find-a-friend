import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsUseCase } from "./search-pets";
import { petBodyMock } from "./__tests__/mockPet";
import { orgBodyMock } from "./__tests__/mockOrg";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: SearchPetsUseCase;

describe("Search Pets use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new SearchPetsUseCase(petsRepository);
  });
  it("should return all pets filter by city", async () => {
    const org = await orgsRepository.create(
      orgBodyMock({ city: "San Francisco" })
    );

    await petsRepository.create(petBodyMock({ orgId: org.id }));
    await petsRepository.create(petBodyMock({ orgId: org.id }));

    const response = await sut.execute({ city: "San Francisco" });
    expect(response.pets).toHaveLength(2);
  });
  it("should return all pets filter by city and size", async () => {
    const org = await orgsRepository.create(
      orgBodyMock({ city: "San Francisco" })
    );

    await petsRepository.create(petBodyMock({ orgId: org.id, size: "MEDIUM" }));
    await petsRepository.create(petBodyMock({ orgId: org.id, size: "LARGE" }));

    const response = await sut.execute({
      city: "San Francisco",
      size: "MEDIUM",
    });
    expect(response.pets).toHaveLength(1);
  });
  it("should return all pets filter by city and age", async () => {
    const org = await orgsRepository.create(
      orgBodyMock({ city: "San Francisco" })
    );

    await petsRepository.create(petBodyMock({ orgId: org.id, age: "ADULT" }));
    await petsRepository.create(petBodyMock({ orgId: org.id, age: "OLD" }));

    const response = await sut.execute({
      city: "San Francisco",
      age: "ADULT",
    });
    expect(response.pets).toHaveLength(1);
  });
  it("should return all pets filter by city and energy level", async () => {
    const org = await orgsRepository.create(
      orgBodyMock({ city: "San Francisco" })
    );

    await petsRepository.create(
      petBodyMock({ orgId: org.id, energy_level: "HIGH" })
    );
    await petsRepository.create(
      petBodyMock({ orgId: org.id, energy_level: "HIGH" })
    );

    const response = await sut.execute({
      city: "San Francisco",
      energy_level: "HIGH",
    });
    expect(response.pets).toHaveLength(2);
  });
  it("should return all pets filter by city and environment", async () => {
    const org = await orgsRepository.create(
      orgBodyMock({ city: "San Francisco" })
    );

    await petsRepository.create(
      petBodyMock({ orgId: org.id, environment: "APARTMENT" })
    );
    await petsRepository.create(
      petBodyMock({ orgId: org.id, environment: "APARTMENT" })
    );

    const response = await sut.execute({
      city: "San Francisco",
      environment: "APARTMENT",
    });
    expect(response.pets).toHaveLength(2);
  });
  it("should return all pets filter by city and level of independence", async () => {
    const org = await orgsRepository.create(
      orgBodyMock({ city: "San Francisco" })
    );

    await petsRepository.create(
      petBodyMock({ orgId: org.id, level_of_independence: "LOW" })
    );
    await petsRepository.create(
      petBodyMock({ orgId: org.id, level_of_independence: "HIGH" })
    );

    const response = await sut.execute({
      city: "San Francisco",
      level_of_independence: "LOW",
    });
    expect(response.pets).toHaveLength(1);
  });
});
