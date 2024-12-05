import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { petBodyMock } from "@/use-cases/__tests__/mockPet";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register Pet (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });
  afterAll(() => {
    app.close();
  });
  it("should register pet", async () => {
    const orgBody = {
      email: "johndoe@example.com",
      password: "123456",
      phone: "999999999",
      responsible: "John Doe",
      address: {
        city: "San Francisco",
        state: "CA",
        street: "San Francisco Street",
        zip_code: "123456",
      },
    };
    await request(app.server).post("/orgs").send(orgBody);

    const org = await prisma.org.findFirstOrThrow();

    const authResponse = await request(app.server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    const pet = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(
        petBodyMock({
          orgId: org.id,
        })
      );
    expect(pet.statusCode).toEqual(201);
  });
});
