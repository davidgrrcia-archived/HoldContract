const { Console } = require("console");
const fs = require("fs");
const contract = JSON.parse(
  fs.readFileSync("./app/build/contracts/HoldContract.json", "utf8")
);
const ABI = contract.abi;
const ADDRESS = contract.networks[5777].address;

module.exports = { ADDRESS, ABI };
