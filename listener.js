#!/usr/bin/env node

#
#     TextMessage.eth
#
#  Nodejs Ethereum Contract Listener that will
#  send a SMS text message to cellphones.
#
#  * PHONE NUMBER NEEDS TO BE ENCRYPTED BEFORE CONTRACT CALL
#  * MESSAGE NEEDS TO BE ENCRYPTED BEFORE CONTRACT CALL
# 
#    Encryption URL: https://cjx.io/encrypt?value=18888888888
#


var twilio = require('twilio');
var Web3 = require('web3');
var crypto = require('crypto');


var accountSid = 'HIDDEN';
var authToken = 'HIDDEN';
var secretKey = "HIDDEN";
var secretIv = "HIDDEN";
var fromNumber = "HIDDEN";

var textMessageContract;
var textEvents;

var client = new twilio(accountSid, authToken);
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8454'));

console.log("Text Message service started!");

var TEXTMESSAGE_ADDRESS = '0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D';

const TEXT_MESSAGE_ABI = [{"constant":true,"inputs":[],"name":"enabled","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"phoneNumber","type":"string"},{"name":"textBody","type":"string"}],"name":"sendText","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"enableContract","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"pauseContract","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"costWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"price","type":"uint256"}],"name":"changeCost","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newCost","type":"uint256"}],"name":"UpdateCost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newStatus","type":"string"}],"name":"UpdateEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"number","type":"string"},{"indexed":false,"name":"message","type":"string"}],"name":"NewText","type":"event"}];

textMessageContract = web3.eth.contract(TEXT_MESSAGE_ABI).at(TEXTMESSAGE_ADDRESS);

var textEvents = textMessageContract.NewText({});

textEvents.watch(function(error, result){
  if (!error){
    var newChannel = result.args;
    var msg = decrypt(newChannel.message);
    var number = decrypt(newChannel.number);
    console.log("Sending Text To: "+number);
    SendText(number, msg);
  }
});


function SendText(number, body) {
  client.messages.create({
      body: body,
      to: '+'+number,
      from: fromNumber
  })
  .then((message) => console.log("TXT Sent: "+message.sid));
}


function decrypt(secrets) {
  var decipher=crypto.createDecipheriv('aes-256-cbc',secretKey,secretIv);
  decipher.setAutoPadding(false);
  var dec = decipher.update(secrets,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}
