import {
  InteractionReplyOptions,
  MessageButton,
  MessageEmbed,
} from 'discord.js';
import { components, row } from 'purplet';
import { UseMoveButton } from '../../modules/components/UseMoveButton';
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

  renderHealthBar(player: Player) {
    const hpPercent = Math.round(
      (player.currentPet.hp / player.currentPet.maxHp) * 10
    );
    const hpBar = `${(player === this.P1 ? '🟦' : '🟥').repeat(
      hpPercent
    )}${'⬜'.repeat(10 - hpPercent)}`;
    return hpBar;
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
            `${this.renderHealthBar(this.P2)} ${this.P1.currentPet.hp}/${
              this.P1.currentPet.maxHp
            }`
          )
          .addField(
            `${this.P2.user.username}'s ${this.P2.currentPet.name} \`LVL ${this.P2.currentPet.level}\``,
            `${this.renderHealthBar(this.P2)} ${this.P2.currentPet.hp}/${
              this.P2.currentPet.maxHp
            }`
          )
          .setColor('YELLOW')
          .setThumbnail(currentUser.currentPet.assets.front.happy),
      ],
      components: components(
        row().addComponents(
          currentUser.currentPet.moves.map((m, i) =>
            new UseMoveButton(m.id)
              .setLabel(m.name)
              .setStyle(currentUser === this.P1 ? 'PRIMARY' : 'DANGER')
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
