import { moves } from '$lib/db';
import { Pet } from './Pet';

const move_effects = {
  poison: { color: 'PURPLE' },
  burn: { color: 'RED' },
};
type MoveEffects = keyof typeof move_effects;

const getCooldown = {
  1: 0,
  2: 2000,
  3: 5000,
  SUPER: 10000,
};

export class PetMove {
  public id: string;
  public name: string;
  public level: 1 | 2 | 3 | 'SUPER';
  public cooldown: number;
  public type: 'ATTACK' | 'HEAL';
  public dmg: number;
  public effect?: MoveEffects;

  constructor(moveId: string) {
    const move = moves[moveId];
    this.id = moveId;
    this.name = move.name;
    this.level = move.level;
    this.cooldown = getCooldown[move.level];
    this.dmg = move.dmg;
    this.effect = move.effect;
  }

  use(pet: Pet) {
    pet.hp -= this.dmg;
  }
}
