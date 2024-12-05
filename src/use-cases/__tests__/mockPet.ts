import { PetCreateInputProps } from "@/repositories/@types/PetsProps";
import { faker } from "@faker-js/faker";

interface PetBodyMockProps {
  orgId: string;
  name?: string;
  size?: "SMALL" | "MEDIUM" | "LARGE";
  age?: "YOUNG" | "ADULT" | "OLD";
  energy_level?: "LOW" | "MEDIUM" | "HIGH";
  level_of_independence?: "LOW" | "MEDIUM" | "HIGH";
  environment?: "APARTMENT" | "HOUSE" | "GARDEN";
}

export function petBodyMock({
  orgId,
  size,
  age,
  energy_level,
  level_of_independence,
  environment,
}: PetBodyMockProps): PetCreateInputProps {
  return {
    name: faker.animal.cat(),
    about: faker.lorem.sentence(),
    size: size ?? faker.helpers.arrayElement(["SMALL", "MEDIUM", "LARGE"]),
    age: age ?? faker.helpers.arrayElement(["YOUNG", "ADULT", "OLD"]),
    energy_level:
      energy_level ?? faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
    level_of_independence:
      level_of_independence ??
      faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
    environment:
      environment ??
      faker.helpers.arrayElement(["APARTMENT", "HOUSE", "GARDEN"]),
    org_id: orgId,
    pet_photos: {
      photos: [faker.image.avatar(), faker.image.avatar()],
    },
    pet_requirements: {
      requirements: [faker.lorem.words(3), faker.lorem.words(3)],
    },
  };
}
