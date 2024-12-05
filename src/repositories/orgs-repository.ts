import { RegisterOrgUseCaseProps } from "@/use-cases/register";
import { Org } from "@prisma/client";

export interface OrgsRepository {
  create(data: RegisterOrgUseCaseProps): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
  findById(id: string): Promise<Org | null>;
}
