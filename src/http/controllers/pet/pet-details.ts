import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makePetDetailsUseCase } from "@/use-cases/factories/make-pet-details-use-case";
import { PetDoesNotExistError } from "@/use-cases/errors/pet-does-not-exist-error";

export async function petDetails(request: FastifyRequest, reply: FastifyReply) {
  const params = z.object({
    id: z.string(),
  });

  const { id } = params.parse(request.params);

  try {
    const petDetailsUseCase = makePetDetailsUseCase();
    const { pet } = await petDetailsUseCase.execute(id);

    return reply.status(200).send({ pet });
  } catch (error) {
    if (error instanceof PetDoesNotExistError) {
      return reply.status(404).send({
        message: error.message,
      });
    }
    throw error;
  }
}
