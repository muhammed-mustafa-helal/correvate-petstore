interface PetCategory {
  id: number;
  name: string;
}

interface PetTag {
  id: number;
  name: string;
}

export interface Pet {
  id: number;
  category: PetCategory;
  name: string;
  photoUrls: string[];
  tags: PetTag[];
  status: string;
  addedToCart ?: boolean;
}


export enum PetStatusEnum {
  AVAILABLE = 'available',
  SOLD = 'sold',
  PENDING = 'pending'
}
