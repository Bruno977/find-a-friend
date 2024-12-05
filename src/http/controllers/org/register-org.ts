import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    responsible: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zip_code: z.string(),
    }),
  });

  const { email, password, phone, responsible, address } =
    registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({
      email,
      password,
      phone,
      responsible,
      address: {
        city: address.city,
        state: address.state,
        street: address.street,
        zip_code: address.zip_code,
      },
    });
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }
    throw error;
  }
  return reply.status(201).send();
}
