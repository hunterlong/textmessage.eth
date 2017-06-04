<center><img width="240" src="http://i.imgur.com/OhQ1ngW.png">

# textmessage.eth
### Send SMS messages via Ethereum Contracts

</center>

TextMessage.ETH will allow you or your contract send SMS text messages to the real world. Using this contract does require a small fee for sending the text message. For international use, the rate is measured in ETH in a range between $0.08 - $0.15 USD. The owner of the contract can change the cost based on ETH/USD exchange rate.


- Mainnet: <not online yet>

- Ropsten Testnet: [0x2D3060D18721f9509b179E8962f220bfd8Df9f5F](https://ropsten.etherscan.io/address/0x2D3060D18721f9509b179E8962f220bfd8Df9f5F)


# Send a Text Message
TextMessage.eth contract just needs a cellphone number, and a body that is less than 196 characters.

```
sendText("18555555555", "This is a text message made from the ethereum blockchain")
# Be sure to send the cost as Ethereum!
```


# Pricing
Please pay the minimum Cost WEI for the contract to successfull process.

Minimum: $0.08 USD
Maximum: $0.15 USD


# Implementing Inside Contracts

```
pragma solidity ^0.4.11;

// TextMessage.ETH Contract Methods
// GNU License - github.com/hunterlong/textmessage.eth
contract TextMessage {
    function sendText(string number, string body) payable public;  // requires minimum wei payment
    function cost() public returns (uint);  // returns minimum wei amount for SMS message
}

contract greeter {
  string greeting;
  uint txtCost;
  address txtAddr = 0x41222E31a6340D2a7c89Fc3D7a7f37e8DdC334a2;  // ropsten testnet
  
  TextMessage txt = TextMessage(txtAddr);
  
  function greeter(string _greeting) public {
        greeting = _greeting;
  }
    
  function updateCost() payable public {
      txtCost = txt.cost.gas(800)();
  }

  function sendMsg() payable public {
      txt.sendText.value(txtCost * 1 wei).gas(600000)("18888888888", "relay for contract 0x41222E31a6340D2a7c89Fc3D7a7f37e8DdC334a2");
  }
  
}
```


# Using Inside Contract

```
TextMessage txt = TextMessage(0x2D3060D18721f9509b179E8962f220bfd8Df9f5F);
uint amount = txt.costWei

txt.sendText.value(amount)("18555555555", "Hey Hey! Bleep Bloop!")
```


# Supported Countries
