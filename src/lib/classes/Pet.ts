import { pets } from '$lib/db';
import { Collection } from 'discord.js';
import { PetMove } from './PetMove';

export interface PetAssets {
  front: string;
  happy: string;
  hurt: string;
  angry: string;
  faint: string;
  super: string;
}

export class Pet {
  public name: string;
  public hp: number;
  public maxHp: number;
  public exp: number;
  public level: number;
  public assets: PetAssets;
  public moves: Collection<string, PetMove>;

  constructor(pet: any) {
    const dbPet = pets[pet.name];

    this.name = pet.name;
    this.hp = pet.hp;
    this.maxHp = dbPet.maxHp;
    this.exp = pet.exp;
    this.level = pet.level;
    this.assets = dbPet.assets;
    this.moves = new Collection();
    dbPet.moves.map((move) => this.moves.set(move.name, new PetMove(move)));
  }
}
