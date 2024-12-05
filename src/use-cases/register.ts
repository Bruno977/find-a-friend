import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { Org } from "@prisma/client";

export interface RegisterOrgUseCaseProps {
  id?: string;
  responsible: string;
  email: string;
  password: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  };
}

interface RegisterUseCaseResponseProps {
  org: Org;
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute({
    email,
    password,
    phone,
    responsible,
    address,
  }: RegisterOrgUseCaseProps): Promise<RegisterUseCaseResponseProps> {
    const password_hash = await hash(password, 6);

    const emailAlreadyExist = await this.orgsRepository.findByEmail(email);
    if (emailAlreadyExist) {
      throw new OrgAlreadyExistsError();
    }
    const org = await this.orgsRepository.create({
      email,
      password: password_hash,
      phone,
      responsible,
      address: {
        city: address.city,
        state: address.state,
        street: address.street,
        zip_code: address.zip_code,
      },
    });
    return { org };
  }
}
