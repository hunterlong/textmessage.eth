<center><img width="240" src="http://i.imgur.com/OhQ1ngW.png"></center>

# textmessage.eth
### Send SMS messages via Ethereum Contracts

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

Minimum: $0.07 USD
Maximum: $0.15 USD


# Using Inside Contract

```
TextMessage txt = TextMessage(0x2D3060D18721f9509b179E8962f220bfd8Df9f5F);
uint amount = txt.costWei

txt.sendText.value(amount)("18555555555", "Hey Hey! Bleep Bloop!")
```


# Supported Countries
