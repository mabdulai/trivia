require("./game.js");

describe("The test environment", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });

  it("should access game", () => {
    expect(Game).toBeDefined();
  });
});

describe("is game playable", () => {
  it("should not be playable with no players", () => {
    const game = new Game();
    expect(game.isPlayable()).toBe(false);
  });

  it("should not be playable with 1 player", () => {
    const game = new Game();
    game.addPlayer("Sue");
    expect(game.isPlayable()).toBe(false);
  });

  it("should be playable with 2 players", () => {
    const game = new Game();
    game.addPlayer("Sue");
    game.addPlayer("Frank");
    expect(game.isPlayable()).toBe(true);
  });
});

describe("is game over", () => {
  it("should not be over when player has 5 coins", () => {
    const game = new Game();
    expect(game.didPlayerWin(5)).toBe(false);
  });

  it("should be over when player has 6 coins", () => {
    const game = new Game();
    expect(game.didPlayerWin(6)).toBe(true);
  });
});

describe("adds players", () => {
  it("should add player", () => {
    const game = new Game();
    game.addPlayer("Sue");
    expect(game.howManyPlayers()).toBe(1);
  });
});
