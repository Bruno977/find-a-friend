import { app } from "@/app";
import { orgBodyMock } from "@/use-cases/__tests__/mockOrg";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register Org (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });
  afterAll(() => {
    app.close();
  });
  it("should register", async () => {
    const response = await request(app.server)
      .post("/orgs")
      .send(orgBodyMock({ city: "San Francisco" }));
    expect(response.statusCode).toEqual(201);
  });
});
