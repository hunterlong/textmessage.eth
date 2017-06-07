pragma solidity ^0.4.11;

// TextMessage.ETH Contract Methods
contract TextMessage {
    function sendText(string phoneNumber, string textBody) payable public;  // requires minimum wei payment
    function costWei() constant returns (uint);  // returns minimum wei amount for SMS message
}

contract example {
  uint txtCost;
  address txtAddr = 0xA221c8dF14434e700fD3af96a96b7a3B66beCAed;  // ropsten testnet
  TextMessage txt = TextMessage(txtAddr);
  
  function example() public { }
  
  function deposit() public payable {
      
  }
    
  function sendMsg() payable public {
      txtCost = txt.costWei();
      txt.sendText.value(txtCost).gas(400000)("18888888888", "relay for contract");
  }
  
}
