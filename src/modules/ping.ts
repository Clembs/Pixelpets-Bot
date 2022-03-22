import { Game } from '$lib/classes/Game';
import { Player } from '$lib/classes/Player';
import { Message } from 'discord.js';
import {
  ButtonComponent,
  ChatCommand,
  components,
  OptionBuilder,
  row,
} from 'purplet';

const activeGames: Map<string, Game> = new Map();

export default ChatCommand({
  name: 'challenge',
  description: 'return pong',
  options: new OptionBuilder().user('opponent', 'A user to challenge'),
  async handle({ opponent }) {
    this.reply({
      allowedMentions: {
        parse: ['users'],
      },
      content: `${opponent}! ${this.user.username} has challenged you to a Pixelpets match! Click the buttons below to accept or decline.`,
      components: components(
        row(
          new AcceptButton({ c: this.user.id, o: opponent.id })
            .setLabel('Accept')
            .setStyle('SUCCESS')
        )
      ),
    });
  },
});

export const AcceptButton = ButtonComponent({
  handle({ c, o }: { c: string; o: string }) {
    if (o !== this.user.id) {
      return this.reply({ content: "you can't use that", ephemeral: true });
    }
    const challenger = new Player(c, this);
    const opponent = new Player(o, this);

    const game = new Game(challenger, opponent, this.message as Message);

    console.log(JSON.stringify(game));

    activeGames.set(this.message.id, game);

    this.update(game.render());
  },
});
