require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
var fs = require('fs');
const Web3 = require('web3');
var bodyParser = require("body-parser");
const mongoose = require('mongoose'); 
const Provider = require('@truffle/hdwallet-provider');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const migrations = require('./build/contracts/Migrations.json');
const prc = require('./build/contracts/PRC.json');
const bac = require('./build/contracts/BAC.json');
const tuc = require('./build/contracts/TUC.json');
const contract = require('truffle-contract');
var prcAddress = '0x1103594decd084277c82566350f2f9dcc151de65';
const address = '0x3e12192Cdeb08D775749036c8272c896057A47a5';
const privateKey = '0x69966ee82a73caae04e84e3bb9e708480894e36126f2855bbed14e679e4e6988';
const infuraUrl = 'https://rinkeby.infura.io/v3/ebc1d1a11f844388978cf96fb5f8173b'; 
var newTUC;
var newBAC;
var bacAddress;
var tucAddress;
// var PRC;
// var BAC;
// var TUC;
var defaultGas = 4700000;
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const Bac = contract(bac);
Bac.setProvider(web3.currentProvider);  
const Migrations = contract(migrations);
Migrations.setProvider(web3.currentProvider);

 
const Prc = contract(prc);
Prc.setProvider(web3.currentProvider);    
       
const Tuc = contract(tuc);      
Tuc.setProvider(web3.currentProvider) ;
// async function smartcontract(a,b,c)
// {
// a = await Prc.deployed(); 
// // b = await Bac.deployed(); 
// // c = await Tuc.deployed();
// console.log("Deployed Successful")
// }
// smartcontract(PRC,BAC,TUC);
// const PRC = new web3.eth.Contract(
//     prc.abi,
//     prc.networks[4].address
//   );
//   const BAC = new web3.eth.Contract(
//     bac.abi,
//     bac.networks[4].address
//   );
//   const TUC = new web3.eth.Contract(
//     tuc.abi,
//     tuc.networks[4].address
//   );
app.use(express.json())

console.log("Connection Successfull!");
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.listen(8000,function()
{
    console.log("Server is running in port 8000");
});
app.post('/regproduct',async function(req, res)
{ 
    var prcInstance;
    console.log(req.body);
    var productName = req.body.productname;
    var productCode = req.body.productCode;
    var rawMaterials = req.body.rawmaterials;
   const PRC= await Prc.deployed(); 
    //const BAC = await Bac.deployed();
    Bac.new({
        from: address,
        gas: defaultGas
    }).then(function(instance)
    {
        console.log("BAC CREATED");
       newBAC = instance.address; 
       console.log(newBAC);
    }).then(function()
    {
        Prc.at(prcAddress).then(function(instance) {
            //console.log(instance);
            prcInstance = instance;
            console.log("Get PRC address Success")
            //console.log(prcInstance);
            return  prcInstance.productRegister(productName, productCode, rawMaterials, newBAC, {
              from: address,
              gas: defaultGas
            });
    }).then(function(txReceipt) {
        console.log(txReceipt);
        var BACaddress = { Bacaddress : newBAC}
        var datasend = JSON.stringify(BACaddress);
        res.send(datasend);
});
});
})
app.post('/regmaterial',async function(req, res)
{ 
    var prcInstance;
    console.log(req.body);
    var materialName = req.body.materialname;
    var materialCode = req.body.materialcode;
   const PRC= await Prc.deployed(); 
    //const BAC = await Bac.deployed();
    Bac.new({
        from: address,
        gas: defaultGas
    }).then(function(instance)
    {
        console.log("BAC CREATED");
       newBAC = instance.address; 
       console.log(newBAC);
    }).then(function()
    {
        Prc.at(prcAddress).then(function(instance) {
            //console.log(instance);
            prcInstance = instance;
            console.log("Get PRC address Success")
            //console.log(prcInstance);
            return prcInstance.materialRegister(materialName, materialCode, newBAC, {
              from: address,
              gas: defaultGas
            });
    }).then(function(txReceipt) {
        console.log(txReceipt);
        var BACaddress = { Bacaddress : newBAC}
        var datasend = JSON.stringify(BACaddress);
        res.send(datasend);
});
});
})
function getTotalProduct()
{
    var prcInstance;
    return  Prc.at(prcAddress).then(function(instance) {
        prcInstance = instance;
        return prcInstance.getNumberOfProducts.call()
      }).then(function(total) {
        return total;
      });
}
function getRegisterProduct(id)
{
    var prcInstance;
    return Prc.at(prcAddress).then(function(instance) {
        prcInstance = instance;
        return prcInstance.getProductOfId.call(id).then(function(product) {
          return {
            id: id,
            name: product[0],
            code: product[1],
            materials: product[2],
            owner: product[3],
            time: product[4],
            addr: product[5]
          }
        })
      });
}
app.get('/showProduct',async function(req, res)
{
    let products = [];
    let total = await getTotalProduct();
    console.log(total)
    for (let i = 1; i <= total; i++) {
        let product = await getRegisterProduct(i);
        products.push(product);
      }
      console.log(products);
      var datasend = JSON.stringify(products);
      res.send(datasend);

})

app.post('/createuser',function(req,res)
{
    var prcInstance;
    var userAddress = req.body.useraddress;
    Prc.at(prcAddress).then(function(instance) {
        prcInstance = instance;
        console.log("Get PRC address Success")
        return prcInstance.addUser(userAddress, {
          from: address,
          gas: defaultGas
        });
      }).then(function(txReceipt) {
        console.log(txReceipt);
        res.send("Create User Success")
      });
})
app.post('/removeuser',function(req,res)
{
    var prcInstance;
    var userAddress = req.body.useraddress;
    Prc.at(prcAddress).then(function(instance) {
        prcInstance = instance;
        console.log("Get PRC address Success")
        return prcInstance.removeUser(userAddress, {
          from: address,
          gas: defaultGas
        });
      }).then(function(txReceipt) {
        console.log(txReceipt);
        res.send("Remove User Success")
      });
})
app.post('/checkuser',function(req,res)
{
    var prcInstance;
    var userAddress = req.body.useraddress;
    Prc.at(prcAddress).then(function(instance) {
        prcInstance = instance;
        console.log("Get PRC address Success")
        return prcInstance.checkUser.call(userAddress);
      }).then(function(result) {
        console.log(result);
        if(result)
        {
        res.send("Address was created");
        }
        else
        {
            res.send("Checking your account or add account again");
        }
      });
})


app.get('/',(req,res)=>res.sendFile(path.resolve(__dirname, './public')));