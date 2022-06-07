const Should = require('should');
const Game = require('./game.js');

describe("The test environment", function () {
  it("should pass", function () {
    true.should.equal(true);
  });

  it("should access game", function () {
    Should(Game).not.equal(undefined);
  });
});

function patch(on, prop, with_, while_) {
  let real = on[prop]
  on[prop] = with_
  let ret = while_()
  on[prop] = real
  return ret
}

describe("Game", function () {
  it("logs when adding players", () => {
    let spyLog = []
    patch(console, "log", spyLog.push.bind(spyLog), () => {
      let game = new Game()
      game.add("<My Name>")
      Should(spyLog).eql(['<My Name> was added', 'They are player number 1'])
    })
  })
  it("calls howManyPlayer 3 times when adding a player", () => {
    var calls = 0
    let game = new Game()
    patch(
      game,
      "howManyPlayers",
      () => { calls +=1 ; return 1;} ,
      () => {
      game.add("<My Name>")
      Should(calls).eql(3)
    })
  })

  // Can't monkey patch constructor scoped variables like "didPlayerWin"

});
