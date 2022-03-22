import {
  InteractionReplyOptions,
  Message,
  MessageButton,
  MessageEmbed,
} from 'discord.js';
import { components, row } from 'purplet';
import { Player } from './Player';

export class Game {
  public challenger: Player;
  public opponent: Player;
  public currentTurn: 'challenger' | 'opponent' = 'challenger';
  private message: Message;

  constructor(challenger: Player, opponent: Player, message: Message) {
    this.challenger = challenger;
    this.opponent = opponent;
    this.message = message;
  }

  changeTurn() {
    this.currentTurn =
      this.currentTurn === 'challenger' ? 'opponent' : 'challenger';
  }

  render(): InteractionReplyOptions {
    const currentUser = this[this.currentTurn];
    const otherUser =
      this[this.currentTurn === 'challenger' ? 'opponent' : 'challenger'];
    return {
      content: `${currentUser.user.username}'s turn!`,
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: `It's ${currentUser.user.username}'s turn!`,
            iconURL: currentUser.user.avatarURL(),
          })
          .addField(
            currentUser.currentPet.name,
            `${'🟩'.repeat(
              Math.round(
                (currentUser.currentPet.hp / currentUser.currentPet.maxHp) * 10
              )
            )} ${'⬜'.repeat(
              Math.round(
                ((currentUser.currentPet.maxHp - currentUser.currentPet.hp) /
                  currentUser.currentPet.maxHp) *
                  10
              )
            )}`
          ),
      ],
      components: components(
        row(
          new MessageButton()
            .setLabel('Moves')
            .setStyle('PRIMARY')
            .setCustomId('ATTACK'),
          new MessageButton()
            .setLabel('Items')
            .setStyle('SECONDARY')
            .setCustomId('ITEMS'),
          new MessageButton()
            .setLabel('Switch Pet')
            .setStyle('SECONDARY')
            .setCustomId('SWITCH_PET')
            .setDisabled(true)
        )
      ),
    };
  }
}
