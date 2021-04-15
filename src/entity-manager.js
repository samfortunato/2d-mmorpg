class EntityManager {

  entities = {};

  storeOtherPlayers(players) {
    this.entities = {
      [player.id]: player,
      ...players,
    };
  }

}

export default new EntityManager();
