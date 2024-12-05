export class PetDoesNotExistError extends Error {
  constructor() {
    super("Pet not found.");
  }
}
