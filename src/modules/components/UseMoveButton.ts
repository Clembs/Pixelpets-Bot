import { ButtonComponent } from 'purplet';
import { activeGames } from '../challenge';

export const UseMoveButton = ButtonComponent({
  handle(moveId: string) {
    console.log(moveId);
    const game = activeGames.get(this.message.id);

    if (game) {
      const currentUser = game[game.currentTurn];
      const otherUser = game[game.currentTurn];

      if (currentUser.currentPet.moves.has(moveId)) {
        const move = currentUser.currentPet.moves.get(moveId);

        move.use(otherUser.currentPet);

        game.changeTurn();
        this.update(game.render());
      }
    }
  },
});
