<p align="center">
  <img width="240" src="http://i.imgur.com/OhQ1ngW.png"><br>
    <b>TextMessage.eth</b><br>
  <a href="https://hunterlong.github.io/textmessage.eth">Website</a> |
  <a href="https://etherscan.io/address/textmessage.eth#code">Mainnet</a> |
  <a href="#implementing-inside-contracts">Implement</a> |
  <a href="#pricing">Pricing</a><br>
  <br>
  TextMessage(<b>0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D</b>)
  <br><br>
</p>

### Send SMS messages via Ethereum Contracts

</center>

TextMessage.ETH will allow you or your contract send SMS text messages to the real world. Using this contract does require a small fee for sending the text message. For international use, the rate is measured in ETH in a range between $0.08 - $0.15 USD. The owner of the contract can change the cost based on ETH/USD exchange rate. TextMessage.eth contract just needs a cellphone number, and a body that is less than 196 characters. You can use this contract by directly interfacing with the ABI json, or you can have your own contract interact with TextMessage.eth.

# Encryption Methods
To keep phone numbers and message information private, TextMessage.eth requires you to send your inputs as encrypted strings. TextMessage.eth will automatically decrypt the variables while keeping information on the blockchain private. Using a simple POST or GET to `https://cjx.io/encrypt?value=18185555555` you can quickly get this encrypted string for your contract. The encryption endpoint accepts CORS so you can have your ajax/js scripts encrypt variables and do the contract call. 

URL POST: `https://cjx.io/encrypt`

POST Parameter: `value=18185555555`

URL GET: `https://cjx.io/encrypt?value=18185555555`

Response: `203c7eaddbea5c20e65ee327dabdf418`

###### You must encrypt your inputs BEFORE sending contract call. 

# Pricing

<img width="350" align="left" src="https://image.ibb.co/eL07v5/Screen_Shot_2017_06_20_at_7_01_48_PM.png">
Please pay the minimum Cost WEI for the contract to successfully process. Pricing for TextMessage.eth may change frequently based on ETH/USD exchange rate. We try to keep it at $0.10 USD in Ether, but as we all know, the exchange rate changes often.

- Normal: $0.10 USD
- Minimum: $0.08 USD
- Maximum: $0.15 USD

| Contract Call             | Estimated Gas Value | Gas Ether Value        | ETH Sent (TXT fee)      |
| ------------------------- |:-------------------:| ------------------:| ----------------------- |
| sendText(phone,message)   | 32,635              | 0.001011685        |       0.00039           |


```
TextMessage txt = TextMessage(0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D);
uint amount = txt.costWei();

// send 'amount' in wei with sendText
```
<p></p>

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
function sendMsg(string phone, string body) internal {
  TextMessage txt = TextMessage(0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D);
  uint txtCost = txt.costWei();
  if (this.balance < txtCost) throw;
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
  
  function greeter() { }
  
  function sendMsg(string phone, string body) internal {
    TextMessage txt = TextMessage(0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D);
    uint txtCost = txt.costWei();
    if (this.balance < txtCost) throw;
    txt.sendText.value(txtCost).gas(80000)(phone, body);
  }

  function sendMessageToPhone() external {
     string memory phone = "203c7eaddbea5c20e65ee327dabdf418"; 
     string memory body = "094a799e62d3acd8f2244daef23f3c2f8fdad20d774613bea1b84fdbe466031b";
     sendMsg(phone, body);
  }
  
}
```
