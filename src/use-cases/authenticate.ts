import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { compare } from "bcryptjs";
import { OrgInvalidCredentials } from "./errors/org-invalid-credentials-error";

interface AuthenticateUseCaseProps {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponseProps {
  org: Org;
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateUseCaseProps): Promise<AuthenticateUseCaseResponseProps> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new OrgInvalidCredentials();
    }
    const passwordMatch = await compare(password, org.password_hash);
    if (!passwordMatch) {
      throw new OrgInvalidCredentials();
    }

    return { org };
  }
}
