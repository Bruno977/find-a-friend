import { InMemoryOrgsRepository } from "./../repositories/in-memory/in-memory-orgs-repository";
import { describe, it, beforeEach, expect } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { OrgInvalidCredentials } from "./errors/org-invalid-credentials-error";

let orgRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate use case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgRepository);
  });
  it("should authenticate a user with valid credentials", async () => {
    const orgBody = {
      email: "johndoe@example.com",
      password: await hash("123456", 6),
      phone: "999999999",
      responsible: "John Doe",
      address: {
        city: "San Francisco",
        state: "CA",
        street: "San Francisco Street",
        zip_code: "123456",
      },
    };
    await orgRepository.create(orgBody);
    const { org } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });
    expect(org).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      })
    );
  });
  it("should throw an error when the password is incorrect", async () => {
    const orgBody = {
      email: "johndoe@example.com",
      password: await hash("123456", 6),
      phone: "999999999",
      responsible: "John Doe",
      address: {
        city: "San Francisco",
        state: "CA",
        street: "San Francisco Street",
        zip_code: "123456",
      },
    };
    await orgRepository.create(orgBody);
    expect(
      async () =>
        await sut.execute({
          email: "johndoe@example.com",
          password: "wrong_password",
        })
    ).rejects.toBeInstanceOf(OrgInvalidCredentials);
  });
  it("should throw an error when the email is not found", async () => {
    expect(
      async () =>
        await sut.execute({
          email: "johndoe2@example.com",
          password: "123456",
        })
    ).rejects.toBeInstanceOf(OrgInvalidCredentials);
  });
});
