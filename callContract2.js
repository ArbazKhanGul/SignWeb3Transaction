const Web3=require('web3');
const address="0xe17FFf2284c75Ff111B4AbCd80f433bFFF5183fb";
const privateKey="f2ea82d23f65f5d70d6e93802f4d064f2d2458ed944a7f3c9def45ac3a20f723";
const infaURL=`https://rinkeby.infura.io/v3/5e38ce9227bc4371869e324a6b38e9eb`;
const abi=require("./ABI.json");

const init2=async ()=>{
const web3=new Web3(infaURL);

const mycontract=new web3.eth.Contract(abi,"0xcbb58CFbD1dC87Db4DEa44AA46Ec3E182525bDd2");

const account =web3.eth.accounts.privateKeyToAccount('0x'+privateKey);
web3.eth.accounts.wallet.add(account);

const tx=mycontract.methods.set(49);
const gas=await tx.estimateGas({from:address});

const gasPrice=await web3.eth.getGasPrice();

const data=tx.encodeABI();
const nonce=await web3.eth.getTransactionCount(address);

const signedTx={
    from:address,
    to:"0xcbb58CFbD1dC87Db4DEa44AA46Ec3E182525bDd2",
    data,
    gas,
    // value: 1000 if send ether
    gasPrice,
    nonce,
    chain:'rinkeby',
    hardfork:'london'
};


console.log("OLD data value :",await mycontract.methods.number().call());


const receipt=await web3.eth.sendTransaction(signedTx);

console.log("Transaction hash :",receipt.transactionHash);

console.log("New data value :",await mycontract.methods.number().call());



}

init2();