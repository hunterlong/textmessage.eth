<p align="center">
  <img width="240" src="http://i.imgur.com/OhQ1ngW.png"><br>
    <b>TextMessage.eth</b><br>
  <a href="https://hunterlong.github.io/textmessage.eth">Website</a> |
  <a href="https://etherscan.io/address/0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D#code">Mainnet</a> |
  <a href="#implementing-inside-contracts">Implement</a> |
  <a href="#pricing">Pricing</a><br>
  <br>
  <b>0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D</b>
  <br><br>
</p>

### Send SMS messages via Ethereum Contracts

</center>

TextMessage.ETH will allow you or your contract send SMS text messages to the real world. Using this contract does require a small fee for sending the text message. For international use, the rate is measured in ETH in a range between $0.08 - $0.15 USD. The owner of the contract can change the cost based on ETH/USD exchange rate.

# Send a Text Message
TextMessage.eth contract just needs a cellphone number, and a body that is less than 196 characters. You can use this contract by directly interfacing with the ABI json, or you can have your own contract interact with TextMessage.eth.

# Encryption Methods

URL POST: `https://cjx.io/encrypt`

Parameter: `value=18185555555`

Response: `203c7eaddbea5c20e65ee327dabdf418`

URL GET: `https://cjx.io/encrypt?value=18185555555`

Response: `203c7eaddbea5c20e65ee327dabdf418`

```
txt.sendText.value(amount).gas(200000)("7b3031af5b66cf99bfe3f297467cd446", d0c0b80f9e7d92954ae8b5ae6ebf7cb4);
```
###### You must encrypt your inputs BEFORE sending contract call. 

# Pricing
Please pay the minimum Cost WEI for the contract to successfully process.

| Contract Call             | Estimated Gas Value | Gas Ether Value        | ETH Sent (TXT fee)      |
| ------------------------- |:-------------------:| ------------------:| ----------------------- |
| sendText(phone,message)   | 32,635              | 0.001011685        |       0.00039           |

- Normal: $0.10 USD
- Minimum: $0.08 USD
- Maximum: $0.15 USD

Pricing for TextMessage.eth may change frequently based on ETH/USD exchange rate. We try to keep it at $0.10 USD in Ether, but as we all know, the exchange rate changes often. 
```
TextMessage txt = TextMessage(0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D);
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

#### TextMessage Helper Function
```
function sendMsg() payable public {
     TextMessage txt = TextMessage(0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D);
     txtCost = txt.costWei();
     
     string phone = "203c7eaddbea5c20e65ee327dabdf418";
     string body = "094a799e62d3acd8f2244daef23f3c2f8fdad20d774613bea1b84fdbe466031b";
     txt.sendText.value(txtCost).gas(80000)(phone, body);
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
  
  address txtAddr = 0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D;
  TextMessage txt = TextMessage(txtAddr);
  
  string toNumber = "7b3031af5b66cf99bfe3f297467cd446";
  string txtBody = "6533afcaa307f98d1e3dbd0d26ac9845150f5d2c2cd99f6ecb1980a8c3a4867c";
  
  function greeter() public { }

  function sendMsg() payable public {
     txtCost = txt.costWei();
     txt.sendText.value(txtCost).gas(80000)(toNumber, txtBody);
  }
  
}
```


# Using Inside Contract

```
TextMessage txt = TextMessage(0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D);
uint amount = txt.costWei();

txt.sendText.value(amount).gas(80000)(toNumber, txtBody);
```
