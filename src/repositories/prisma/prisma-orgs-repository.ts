import { prisma } from "@/lib/prisma";
import { OrgsRepository } from "../orgs-repository";
import { RegisterOrgUseCaseProps } from "@/use-cases/register";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: RegisterOrgUseCaseProps) {
    const org = await prisma.org.create({
      data: {
        email: data.email,
        password_hash: data.password,
        responsible: data.responsible,
        phone: data.phone,
        address: {
          create: {
            street: data.address.street,
            city: data.address.city,
            state: data.address.state,
            zip_code: data.address.zip_code,
          },
        },
      },
    });
    return org;
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: { email },
    });
    return org;
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: { id },
    });
    return org;
  }
}
