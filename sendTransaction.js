const Web3=require('web3');
const address="0xe17FFf2284c75Ff111B4AbCd80f433bFFF5183fb";
const privateKey="f2ea82d23f65f5d70d6e93802f4d064f2d2458ed944a7f3c9def45ac3a20f72";
const infaURL=`https://rinkeby.infura.io/v3/5e38ce9227bc4371869e324a6b38e9eb`;
const abi=require("./ABI.json");

const init1=async ()=>{
const web3=new Web3(infaURL);


const netWorkId=await web3.eth.net.getId();




const gasPrice=await web3.eth.getGasPrice();

const nonce=await web3.eth.getTransactionCount(address);

// const estimation=await web3.eth.estimateGas({from:address});

// const gas=web3.utils.toWei("1","ether");
console.log("gass get is",gasPrice);

const signedTx=await web3.eth.accounts.signTransaction({
    to:"0x048f391974dE6c607151407Ec811a82343E62b81",
    gas:21000,
    value: web3.utils.toWei("0.1","ether"),
    gasPrice,
    nonce,
    chainId:netWorkId
},"f2ea82d23f65f5d70d6e93802f4d064f2d2458ed944a7f3c9def45ac3a20f723");


const receipt=await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

console.log("Transaction hash :",receipt.transactionHash);

}

init1();