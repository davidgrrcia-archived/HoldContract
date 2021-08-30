const express = require("express");
const HoldContract = require("./Methods");
const contract = new HoldContract();

const users = new Map(); //username -> wallet address
const games = new Map(); //game id -> array of players wallet address (position 0 for owner game)
const holds = new Map(); //game id -> array of holdIds (position 0 for first joining the game)
const bets = new Map(); //username -> games ids

class Server {
  constructor() {
    this.app = express();
    this.app.use(express.json());

    this.routes();

    this.app.listen(8080);
  }

  routes() {
    this.app.post("/register", (req, res) => {
      const { username, address } = req.body;

      if (users.get(username) == null) {
        users.set(username, address);

        contract.register(address);
        res.json({
          username: username,
          address: address,
        });
      } else {
        res.json({
          msg: "The account already exists",
        });
      }
    });

    this.app.post("/my-balance", (req, res) => {
      const { username } = req.body;

      let address = users.get(username);

      if (users.get(username) != null) {
        contract.balanceOf(address).then(function (result) {
          res.json({
            username: username,
            address: address,
            balance: result,
          });
        });
      } else {
        res.json({
          msg: "The account doesnt exists",
        });
      }
    });

    this.app.post("/newGame", (req, res) => {
      const { game_id, owner_username } = req.body;

      let owner_address = users.get(owner_username);

      if (games.get(game_id) == null && owner_address != null) {
        var players = [];
        players.push(owner_address);
        games.set(game_id, players);
        holds.set(game_id, []);

        if (bets.get(owner_username) == null) {
          bets.set(owner_username, [game_id]);
        } else {
          bets.get(owner_username).push(game_id);
        }

        res.json({
          game_id: game_id,
        });
      } else {
        res.json({
          msg: "The game already exists",
        });
      }
    });

    this.app.post("/joinGame", (req, res) => {
      const { game_id, username } = req.body;

      let address = users.get(username);
      let num = games.get(game_id).length + 1;
      let address_owner = games.get(game_id)[0];
      let holdId = game_id + num;

      if (!games.get(game_id).includes(address)) {
        if (bets.get(username) == null) {
          bets.set(username, [game_id]);
        } else {
          bets.get(username).push(game_id);
        }

        if (num < 4) {
          games.get(game_id).push(address);
          holds.get(game_id).push(holdId);
          contract.hold(address, address_owner, 5, holdId);

          res.json({
            game_id: game_id,
            holdId: holdId,
            players: num,
          });
        } else if (num == 4) {
          games.get(game_id).push(address);
          contract.hold(address, address_owner, 5, game_id);

          let winner = Math.random() * 4;
          let winner_address = games.get(game_id)[winner];

          for (let index = 1; index < 4; index++) {
            let player = games.get(game_id)[index];
            let id = holds.get(game_id)[index - 1];
            contract.executeHold(player, id);
          }

          if (winner_address != address_owner) {
            contract.transfer(address_owner, winner_address, 20);
          }

          res.json({
            game_id: game_id,
            winner: winner,
          });
        } else {
          res.json({
            game_id: game_id,
            players: "juego completo",
          });
        }
      } else {
        res.json({
          msg: "Player already added to the game",
        });
      }
    });

    this.app.post("/my-bets", (req, res) => {
      const { username } = req.body;

      if (users.get(username) != null) {
        let mybets = bets.get(username).join(", ");
        res.json({
          mybets,
        });
      } else {
        res.json({
          msg: "The account doesnt exists",
        });
      }
    });
  }
}

module.exports = Server;
