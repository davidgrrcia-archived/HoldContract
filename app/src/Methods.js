const Contract = require("./Contract");
const Provider = require("./Provider");
const provider = new Provider();
const contract = new Contract();
const web3 = provider.web3;
const instance = contract.initContract();

class HoldContract {
  async register(address) {
    let accounts = await web3.eth.getAccounts();
    await instance.methods.transfer(address, 100).send({ from: accounts[0] });
  }

  async transfer(sender, recipient, amount) {
    await instance.methods.transfer(recipient, amount).send({ from: sender });
  }

  async balanceOf(address) {
    var address;
    return await instance.methods.balanceOf(address).call();
  }

  async hold(sender, recipient, amount, holdId) {
    await instance.methods
      .hold(recipient, amount, holdId)
      .send({ from: sender, gas: 3000000 });
  }

  async executeHold(sender, holdId) {
    await instance.methods.executeHold(holdId).send({ from: sender });
  }
}
module.exports = HoldContract;
