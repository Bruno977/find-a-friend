import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate Org (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });
  afterAll(() => {
    app.close();
  });
  it("should authenticate", async () => {
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

    const response = await request(app.server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "123456",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("token");
  });
});
