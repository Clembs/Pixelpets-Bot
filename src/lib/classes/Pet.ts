import { pets } from '$lib/db';
import { Collection } from 'discord.js';
import { PetMove } from './PetMove';

export interface PetAssets {
  front: {
    idle: string;
    happy: string;
    hurt: string;
    angry: string;
    faint: string;
  };
  back: {
    idle: string;
    super: string;
    hurt: string;
  };
}

export class Pet {
  public id: string;
  public name: string;
  public hp: number;
  public maxHp: number;
  public exp: number;
  public level: number;
  public assets: PetAssets;
  public moves: Collection<string, PetMove>;

  constructor(pet: Partial<Pet>) {
    const dbPet = pets[pet.id];
    const moves: Collection<string, PetMove> = new Collection();

    this.id = pet.id;
    this.name = dbPet.name;
    this.hp = pet.hp;
    this.maxHp = dbPet.maxHp;
    this.exp = pet.exp;
    this.level = pet.level;
    this.assets = dbPet.assets;
    dbPet.moves.forEach((move) => moves.set(move, new PetMove(move)));
    this.moves = moves;
  }
}
