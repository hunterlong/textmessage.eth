<p align="center">
  <img width="240" src="http://i.imgur.com/OhQ1ngW.png"><br>
    <b>TextMessage.eth</b> (BETA)<br>
  <a href="https://ropsten.etherscan.io/address/0xa221c8df14434e700fd3af96a96b7a3b66becaed">Mainnet</a> |
  <a href="#implementing-inside-contracts">Implement</a> |
  <a href="#pricing">Pricing</a>
  <br><br>
</p>

### Send SMS messages via Ethereum Contracts

</center>

TextMessage.ETH will allow you or your contract send SMS text messages to the real world. Using this contract does require a small fee for sending the text message. For international use, the rate is measured in ETH in a range between $0.08 - $0.15 USD. The owner of the contract can change the cost based on ETH/USD exchange rate.

# Send a Text Message
TextMessage.eth contract just needs a cellphone number, and a body that is less than 196 characters. You can use this contract by directly interfacing with the ABI json, or you can have your own contract interact with TextMessage.eth.

<p align="center">
  <img width="300" src="http://i.imgur.com/2S994TG.png">
</p>

# Pricing
Please pay the minimum Cost WEI for the contract to successfully process.

- Minimum: $0.08 USD
- Maximum: $0.15 USD

```
TextMessage txt = TextMessage(0xA221c8dF14434e700fD3af96a96b7a3B66beCAed); // ropsten testnet
uint amount = txt.costWei();

// send 'amount' in wei with sendText
```


# Implementing Inside Contracts

#### TextMessage Contract API
```
// TextMessage.ETH Contract Methods
contract TextMessage {
    function sendText(string number, string body) payable public;  // requires minimum wei payment
    function costWei() constant returns (uint); // returns minimum wei amount for SMS message
}
```

#### Complete Example Script
```
pragma solidity ^0.4.11;

// TextMessage.ETH Contract Methods
contract TextMessage {
    function sendText(string phoneNumber, string textBody) payable public;  // requires minimum wei payment
    function costWei() constant returns (uint);  // returns minimum wei amount for SMS message
}

contract greeter {
  uint txtCost;
  
  address txtAddr = 0xA221c8dF14434e700fD3af96a96b7a3B66beCAed;  // ropsten testnet
  TextMessage txt = TextMessage(txtAddr);
  
  function greeter() public { }

  function sendMsg() payable public {
     txtCost = txt.costWei();
     txt.sendText.value(txtCost).gas(200000)("18888888888", "relay for contract");
  }
  
}
```


# Using Inside Contract

```
TextMessage txt = TextMessage(0xA221c8dF14434e700fD3af96a96b7a3B66beCAed); // ropsten testnet
uint amount = txt.costWei();

txt.sendText.value(amount).gas(200000)("18888888888", "relay for contract");
```
