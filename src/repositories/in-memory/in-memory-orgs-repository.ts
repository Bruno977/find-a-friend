import { OrgsRepository } from "@/repositories/orgs-repository";
import { RegisterOrgUseCaseProps } from "@/use-cases/register";
import { Address, Org } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];
  public addresses: Address[] = [];

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email);
    if (!org) {
      return null;
    }
    return org;
  }

  async create(data: RegisterOrgUseCaseProps): Promise<Org> {
    const addressId = randomUUID();

    const address = {
      id: addressId,
      city: data.address.city,
      state: data.address.state,
      street: data.address.street,
      zip_code: data.address.zip_code,
    };

    this.addresses.push(address);

    const org: Org = {
      id: randomUUID(),
      email: data.email,
      password_hash: data.password,
      responsible: data.responsible,
      phone: data.phone,
      address_id: addressId,
    };

    this.items.push(org);
    return org;
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((item) => item.id === id);
    if (!org) {
      return null;
    }
    return org;
  }
}
