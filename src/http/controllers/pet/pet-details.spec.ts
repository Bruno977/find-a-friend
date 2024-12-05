import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { orgBodyMock } from "@/use-cases/__tests__/mockOrg";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Pet Details (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });
  afterAll(() => {
    app.close();
  });
  it("should return pet details", async () => {
    await request(app.server)
      .post("/orgs")
      .send(orgBodyMock({ city: "San Francisco" }));

    const org = await prisma.org.findFirstOrThrow();

    const pet = await prisma.pet.create({
      data: {
        about: "About",
        name: "Pet",
        age: "ADULT",
        energy_level: "HIGH",
        environment: "APARTMENT",
        level_of_independence: "HIGH",
        org_id: org.id,
        petPhotos: {
          createMany: {
            data: [{ photo_url: "photo_1" }, { photo_url: "photo_2" }],
          },
        },
        petRequirements: {
          createMany: {
            data: [
              { description: "Description 1" },
              { description: "Description 2" },
            ],
          },
        },
      },
    });
    const response = await request(app.server).get(`/pets/${pet.id}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        pet: expect.objectContaining({
          name: "Pet",
        }),
      })
    );
  });
});
