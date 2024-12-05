type Size = "SMALL" | "MEDIUM" | "LARGE";
type Age = "YOUNG" | "ADULT" | "OLD";
type EnergyLevel = "LOW" | "MEDIUM" | "HIGH";
type LevelOfIndependence = "LOW" | "MEDIUM" | "HIGH";
type Environment = "APARTMENT" | "HOUSE" | "GARDEN";

export interface PetCreateInputProps {
  id?: string;
  name: string;
  about: string;
  size: Size;
  age: Age;
  energy_level: EnergyLevel;
  level_of_independence: LevelOfIndependence;
  environment: Environment;
  org_id: string;
  pet_photos: {
    id?: string;
    photos: string[];
  };
  pet_requirements: {
    id?: string;
    requirements: string[];
  };
}
