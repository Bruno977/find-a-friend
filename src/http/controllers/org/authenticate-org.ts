import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { OrgInvalidCredentials } from "@/use-cases/errors/org-invalid-credentials-error";

export async function AuthenticateOrg(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { org } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    );
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: "7d",
        },
      }
    );
    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (error) {
    if (error instanceof OrgInvalidCredentials) {
      return reply.status(400).send({
        message: error.message,
      });
    }
    throw error;
  }
}
