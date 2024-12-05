import { FastifyInstance } from "fastify";
import { registerOrg } from "./controllers/org/register-org";
import { AuthenticateOrg } from "./controllers/org/authenticate-org";
import { petDetails } from "./controllers/pet/pet-details";
import { verifyJwt } from "./controllers/middlewares/verify-jwt";
import { searchPets } from "./controllers/pet/search-pets";
import { registerPet } from "./controllers/pet/register-pet";
import { refresh } from "./controllers/org/refresh";

export async function appRoutes(app: FastifyInstance) {
  app.post("/orgs", registerOrg);
  app.post("/sessions", AuthenticateOrg);

  app.patch("/token/refresh", refresh);

  app.get("/pets/:id", petDetails);
  app.get(
    "/pets",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            city: { type: "string" },
          },
          required: ["city"],
        },
      },
    },
    searchPets
  );

  /** Authenticated */
  app.post("/pets", { onRequest: [verifyJwt] }, registerPet);
}
