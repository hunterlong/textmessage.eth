var MY_ADDRESS = '0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D'

var costWei = 0;

const abi = [{"constant":true,"inputs":[],"name":"enabled","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"phoneNumber","type":"string"},{"name":"textBody","type":"string"}],"name":"sendText","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"enableContract","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"pauseContract","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"costWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"price","type":"uint256"}],"name":"changeCost","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newCost","type":"uint256"}],"name":"UpdateCost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newStatus","type":"string"}],"name":"UpdateEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"number","type":"string"},{"indexed":false,"name":"message","type":"string"}],"name":"NewText","type":"event"}];

var deployedContract;


$("#sendthetxt").click(function() {

  var phone = $("#number").val();
  var message = $("#bodymsg").val();

  if (message!='' || phone!=''){

  $.ajax({
    url: "https://cjx.io/encrypt",type: "POST",data: "value="+encodeURI(phone),
    success: function(result)
      {
        phone = result;

        $.ajax({
          url: "https://cjx.io/encrypt",type: "POST",data: "value="+encodeURI(message),
          success: function(result)
            {
              message = result;

              SendText(phone,message);

            }
          });
      }
  });

}

});




window.addEventListener("load", function(){

  if (typeof web3 === 'undefined') {
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://main.cjx.io"));
    return renderMessage('<div>You need to install <a href=“https://metmask.io“>MetaMask </a> to use this feature.  <a href=“https://metmask.io“>https://metamask.io</a></div>')
  }

   deployedContract = web3.eth.contract(abi).at(MY_ADDRESS);

     deployedContract.costWei(function(error, result){
     if(!error) {
           costWei = result;
		       renderCost(web3.fromWei(costWei, 'ether')+ " ETH per txt");
     } else {
         console.error(error);
	 }
 });

});






function renderMessage (message) {
  var messageEl = document.querySelector('.message')
  messageEl.innerHTML = message
}

function renderCost (message) {
  var messageEl = document.querySelector('.costwei')
  messageEl.innerHTML = message
}



function SendText(num,body) {

alert("Sending: "+num+" Body: "+body);

  deployedContract.sendText(num, body, {value: costWei, gas: 50000}, function(error, result){
    if(!error)
      console.log(result);
    else
      console.error(error);
  });


}
