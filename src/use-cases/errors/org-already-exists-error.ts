export class OrgAlreadyExistsError extends Error {
  constructor() {
    super("Email already exists.");
  }
}
