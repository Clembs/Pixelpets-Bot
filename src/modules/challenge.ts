import { Game } from '$lib/classes/Game';
import { Player } from '$lib/classes/Player';
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
  description: 'Challenge someone to a Pixelpets game!',
  options: new OptionBuilder().user('opponent', 'A user to challenge', true),
  async handle({ opponent }) {
    this.reply({
      allowedMentions: {
        parse: ['users'],
      },
      content: `${opponent}! ${this.user.username} has challenged you to a Pixelpets game! Click the buttons below to accept or decline.`,
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
    const game = new Game(challenger, opponent);

    activeGames.set(this.message.id, game);

    this.update(game.render());
  },
});
