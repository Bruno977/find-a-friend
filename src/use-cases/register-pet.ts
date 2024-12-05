import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { OrgDoesNotExistError } from "./errors/org-does-not-exist-error";
import { PetCreateInputProps } from "@/repositories/@types/PetsProps";

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}
  async execute(data: PetCreateInputProps) {
    const findOrg = await this.orgsRepository.findById(data.org_id);
    if (!findOrg) {
      throw new OrgDoesNotExistError();
    }
    const pet = await this.petsRepository.create(data);
    return { pet };
  }
}
