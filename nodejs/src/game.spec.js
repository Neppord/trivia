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
});
