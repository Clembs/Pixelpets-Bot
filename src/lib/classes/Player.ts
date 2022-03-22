import { users } from '$lib/db';
import { Collection, Interaction, Snowflake, User } from 'discord.js';
import { Item } from './Item';
import { Pet } from './Pet';

export class Player {
  public id: Snowflake;
  public user: User;
  public gold: number;
  public exp: number;
  public level: number;
  public items: Collection<string, Item>;
  public pets: Collection<string, Pet>;
  public currentPet: Pet;
  /**
   * Creates a new Player instance.
   * @param userId The user's Discord id
   */
  constructor(userId: string, context: Interaction) {
    const user = users[userId];
    this.id = userId;
    this.user = context.client.users.cache.get(userId);
    this.items = new Collection();
    this.pets = new Collection();
    this.gold = user.gold;
    this.exp = user.exp;
    this.level = user.level;
    user.items.map((item) => this.items.set(item.id, new Item(item)));
    user.pets.map((pet) => this.pets.set(pet.id, new Pet(pet)));
    this.currentPet = this.pets.first();
  }
}
