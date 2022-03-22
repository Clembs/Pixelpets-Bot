import {
  InteractionReplyOptions,
  MessageButton,
  MessageEmbed,
} from 'discord.js';
import { components, row } from 'purplet';
import { Pet } from './Pet';
import { Player } from './Player';

export class Game {
  public P1: Player;
  public P2: Player;
  public currentTurn: 'P1' | 'P2' = 'P1';

  constructor(P1: Player, P2: Player) {
    this.P1 = P1;
    this.P2 = P2;
  }

  changeTurn() {
    this.currentTurn = this.currentTurn === 'P1' ? 'P2' : 'P1';
  }

  render(): InteractionReplyOptions {
    const currentUser = this[this.currentTurn];
    const otherUser = this[this.currentTurn === 'P1' ? 'P1' : 'P1'];

    return {
      allowedMentions: {
        parse: ['users'],
      },
      content: `It's ${currentUser.user}'s turn!`,
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: `${this.P1.user.username} vs ${this.P2.user.username}`,
            iconURL: currentUser.user.avatarURL(),
          })
          .addField(
            `${this.P1.user.username}'s ${this.P1.currentPet.name} \`LVL ${this.P1.currentPet.level}\``,
            `${renderHealthBar(this.P1.currentPet)} ${this.P1.currentPet.hp}/${
              this.P1.currentPet.maxHp
            }`
          )
          .addField(
            `${this.P2.user.username}'s ${this.P2.currentPet.name} \`LVL ${this.P2.currentPet.level}\``,
            `${renderHealthBar(this.P2.currentPet)} ${this.P2.currentPet.hp}/${
              this.P2.currentPet.maxHp
            }`
          )
          .setColor('YELLOW')
          .setThumbnail(currentUser.currentPet.assets.front.happy),
      ],
      components: components(
        row().addComponents(
          currentUser.currentPet.moves.map((m, i) =>
            new MessageButton()
              .setLabel(m.name)
              .setStyle('PRIMARY')
              .setCustomId(`ATTACK_${i + 1}`)
          )
        ),
        row(
          new MessageButton()
            .setLabel('Items')
            .setStyle('SECONDARY')
            .setCustomId(`${this.currentTurn}_ITEMS`),
          new MessageButton()
            .setLabel('Switch Pet')
            .setStyle('SECONDARY')
            .setCustomId(`${this.currentTurn}_SWITCH_PET`)
            .setDisabled(true)
        )
      ),
    };
  }
}

function renderHealthBar(pet: Pet) {
  // divide to get percentage
  const hpPercent = Math.round((pet.hp / pet.maxHp) * 10);
  const hpBar = `${'🟩'.repeat(hpPercent)}${'⬜'.repeat(10 - hpPercent)}`;
  return hpBar;
}
