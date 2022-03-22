import { users } from '$lib/db';
import { Client, Collection, Interaction, Snowflake, User } from 'discord.js';
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
  private client: Client;
  /**
   * Creates a new Player instance.
   * @param userId The user's Discord id
   */
  constructor(userId: string, context: Interaction) {
    const user = users[userId];
    this.id = userId;
    this.client = context.client;
    this.user = this.client.users.cache.get(userId);
    this.items = new Collection();
    this.pets = new Collection();
    this.gold = user.gold;
    this.exp = user.exp;
    this.level = user.level;
    user.items.map((item) => this.items.set(item.name, new Item(item)));
    user.pets.map((pet) => this.pets.set(pet.name, new Pet(pet)));
    this.currentPet = this.pets.first();
  }
}
