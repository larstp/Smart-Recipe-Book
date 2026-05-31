import type { Profile } from './Profile';

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category:
    | 'protein'
    | 'dairy'
    | 'produce'
    | 'grain'
    | 'condiment'
    | 'spice'
    | 'frozen'
    | 'other';
  owner: Profile;
  created: Date;
  updated: Date;
}

export interface Pantry {
  items: PantryItem[];
}
