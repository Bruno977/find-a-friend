import { Pet } from "@prisma/client";
import { PetCreateInputProps } from "./@types/PetsProps";

export interface FindAllParams {
  city: string;
  size?: "SMALL" | "MEDIUM" | "LARGE";
  age?: "YOUNG" | "ADULT" | "OLD";
  energy_level?: "LOW" | "MEDIUM" | "HIGH";
  level_of_independence?: "LOW" | "MEDIUM" | "HIGH";
  environment?: "APARTMENT" | "HOUSE" | "GARDEN";
}

export interface PetsRepository {
  create(data: PetCreateInputProps): Promise<Pet>;
  findAll(params: FindAllParams): Promise<Pet[]>;
  findById(id: string): Promise<Pet | null>;
}
