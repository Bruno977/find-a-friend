import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, it, expect } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterUseCase(orgsRepository);
  });
  it("should successfully register a new organization", async () => {
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
    const { org } = await sut.execute(orgBody);
    expect(org).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      })
    );
  });

  it("should hash the password when registering a new organization", async () => {
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
    const { org } = await sut.execute(orgBody);

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      org.password_hash
    );
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should throw an error when registering with an email that already exists", async () => {
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
    await sut.execute(orgBody);
    expect(async () => await sut.execute(orgBody)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError
    );
  });
});
