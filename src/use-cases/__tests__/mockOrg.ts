import { faker } from "@faker-js/faker";
import { RegisterOrgUseCaseProps } from "../register";

interface OrgBodyMock {
  city: string;
}

export function orgBodyMock({ city }: OrgBodyMock): RegisterOrgUseCaseProps {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    responsible: faker.person.fullName(),
    address: {
      city: city,
      state: faker.location.state(),
      street: faker.location.street(),
      zip_code: faker.location.zipCode(),
    },
  };
}
