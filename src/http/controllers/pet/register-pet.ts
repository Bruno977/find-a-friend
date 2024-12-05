import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterPetUseCase } from "@/use-cases/factories/make-register-pet-use-case";
import { OrgDoesNotExistError } from "@/use-cases/errors/org-does-not-exist-error";

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const petBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    age: z.enum(["YOUNG", "ADULT", "OLD"]),
    energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
    level_of_independence: z.enum(["LOW", "MEDIUM", "HIGH"]),
    environment: z.enum(["APARTMENT", "HOUSE", "GARDEN"]),
    org_id: z.string(),
    pet_photos: z.object({
      photos: z.array(z.string()),
    }),
    pet_requirements: z.object({
      requirements: z.array(z.string()),
    }),
  });

  const {
    name,
    about,
    age,
    energy_level,
    environment,
    level_of_independence,
    org_id,
    pet_photos,
    pet_requirements,
    size,
  } = petBodySchema.parse(request.body);

  try {
    const registerPetUseCase = makeRegisterPetUseCase();
    await registerPetUseCase.execute({
      name,
      about,
      age,
      energy_level,
      environment,
      level_of_independence,
      size,
      org_id,
      pet_photos,
      pet_requirements,
    });
    return reply.status(201).send();
  } catch (error) {
    if (error instanceof OrgDoesNotExistError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
    throw error;
  }
}
