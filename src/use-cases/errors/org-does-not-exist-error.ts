export class OrgDoesNotExistError extends Error {
  constructor() {
    super("Org not found.");
  }
}
