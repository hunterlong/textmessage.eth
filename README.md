<p align="center">
  <img width="240" src="http://i.imgur.com/OhQ1ngW.png"><br>
    <b>TextMessage.eth</b><br>
  <a href="https://hunterlong.github.io/textmessage.eth">Website</a> |
  <a href="https://etherscan.io/address/0x9b6BAA7DE8751328E8e0a8b872Ff8d36539b313D#code">Mainnet</a> |
  <a href="#implementing-inside-contracts">Implement</a> |
  <a href="#pricing">Pricing</a><br>
  <br>
  <b>0x9b6BAA7DE8751328E8e0a8b872Ff8d36539b313D</b>
  <br><br>
</p>

### Send SMS messages via Ethereum Contracts

</center>

TextMessage.ETH will allow you or your contract send SMS text messages to the real world. Using this contract does require a small fee for sending the text message. For international use, the rate is measured in ETH in a range between $0.08 - $0.15 USD. The owner of the contract can change the cost based on ETH/USD exchange rate.

# Encryption Methods

URL POST: `https://cjx.io/encrypt.php`

Parameter: `value=18185555555`

Response: `7b3031af5b66cf99bfe3f297467cd446`

```
txt.sendText.value(amount).gas(200000)("7b3031af5b66cf99bfe3f297467cd446", d0c0b80f9e7d92954ae8b5ae6ebf7cb4);
```
###### You must encrypt your inputs BEFORE sending contract call. 

# Send a Text Message
TextMessage.eth contract just needs a cellphone number, and a body that is less than 196 characters. You can use this contract by directly interfacing with the ABI json, or you can have your own contract interact with TextMessage.eth.

| Contract Call             | Estimated Gas Value | Gas Ether Value        | ETH Sent (TXT fee)      |
| ------------------------- |:-------------------:| ------------------:| ----------------------- |
| sendText(phone,message)   | 32,635              | 0.001011685        |       0.00039           |

<p align="center">
  <img width="300" src="http://i.imgur.com/2S994TG.png">
</p>

# Pricing
Please pay the minimum Cost WEI for the contract to successfully process.

- Normal: $0.10 USD
- Minimum: $0.08 USD
- Maximum: $0.15 USD

Pricing for TextMessage.eth may change frequently based on ETH/USD exchange rate. We try to keep it at $0.10 USD in Ether, but as we all know, the exchange rate changes often. 
```
TextMessage txt = TextMessage(0x9b6BAA7DE8751328E8e0a8b872Ff8d36539b313D);
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
  
  address txtAddr = 0x9b6BAA7DE8751328E8e0a8b872Ff8d36539b313D;
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
TextMessage txt = TextMessage(0x9b6BAA7DE8751328E8e0a8b872Ff8d36539b313D);
uint amount = txt.costWei();

txt.sendText.value(amount).gas(200000)("18888888888", "relay for contract");
```
