import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PetDoesNotExistError } from "@/use-cases/errors/pet-does-not-exist-error";
import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const query = z.object({
    city: z.string().min(1),
    age: z.enum(["YOUNG", "ADULT", "OLD"]).optional(),
    energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    level_of_independence: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    environment: z.enum(["APARTMENT", "HOUSE", "GARDEN"]).optional(),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
  });

  const { city, age, size, level_of_independence, energy_level, environment } =
    query.parse(request.query);

  try {
    const petSearchUseCase = makeSearchPetsUseCase();
    const { pets } = await petSearchUseCase.execute({
      city,
      age,
      energy_level,
      environment,
      level_of_independence,
      size,
    });

    return reply.status(200).send({ pets });
  } catch (error) {
    if (error instanceof PetDoesNotExistError) {
      return reply.status(404).send({
        message: error.message,
      });
    }
    throw error;
  }
}
