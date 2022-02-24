const solc = require("solc");

// file system - read and write files to your computer
const fs = require("fs");

// web3 interface
const Web3 = require("web3");

// setup a http provider
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// reading the file contents of the smart  contract

const fileContent = fs.readFileSync("demo.sol").toString();
// console.log(fileContent);

// create an input structure for my solidity compiler
var input = {
  language: "Solidity",
  sources: {
    "demo.sol": {
      content: fileContent,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log("Output: ", output);

const ABI = output.contracts["demo.sol"]["Demo"].abi;
const byteCode = output.contracts["demo.sol"]["Demo"].evm.bytecode.object;

console.log("abi: ",ABI)
console.log("byte code: ",byteCode)

contract = new web3.eth.Contract(ABI);
let defaultAccount;
web3.eth.getAccounts().then((accounts) => {
  console.log("Accounts:", accounts); //it will show all the ganache accounts

  defaultAccount = accounts[0];
  console.log("Default Account:", defaultAccount); //to deploy the contract from default Account
  contract
    //deploy contract
    .deploy({ data: byteCode })
    .send({ from: defaultAccount, gas: 470000 })
    //catch event
    .on("receipt", (receipt) => {
      //event,transactions,contract address will be returned by blockchain
      console.log("Contract Address:", receipt.contractAddress);
    })
    //interact with smart contract
    .then((demoContract) => {
      demoContract.methods.x().call((err, data) => {
        console.log("Initial Value:", data);
      });
    });
});