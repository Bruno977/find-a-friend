export class OrgInvalidCredentials extends Error {
  constructor() {
    super("Invalid email or password.");
  }
}
