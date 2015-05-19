/**
 * Created by pmoskovi on 5/14/15.
 */

(function() {

  var tickerList = [];
  var stock;
  var stockTable = document.getElementById("stockTable");

  Kaazing.Messaging.newContext("ws://wallet.kaazing.com/jms")
      .then(function(context) {
          context.newSubscriber ("stock")
            .then(function(subscriber) {
                subscriber.map (function (quote) {
                  // console.log (quote);
                  var splitStock = quote.split(":");
                  splitStock[2]="$"+splitStock[2];
                  return splitStock;
                })
                .filter (function(stock) {
                  return stock[1] == "MSFT";
                  // return true;
                })
                .forEach(function (stock) {
                  console.log (stock);
                  //There's no row for this ticker yet (first time receiving it)
                  if (tickerList.indexOf(stock[1])<0) {
                    tickerList.push(stock[1]);
                    stockRow = stockTable.insertRow(tickerList.length);
                    stockRow.insertCell(0).innerHTML = stock[0];
                    stockRow.insertCell(1).innerHTML = stock[1];
                    stockRow.insertCell(2).innerHTML = stock[2];
                  }
                  //The table exists, let's update it
                  else {
                    cell = stockTable.rows[tickerList.indexOf(stock[1])+1].cells[2];
                    // Setting green-red colors
                    (cell.innerText < stock[2]) ?
                    cell.className = "success" :
                    cell.className = "danger";
                    // Setting new price value
                    stockTable.rows[tickerList.indexOf(stock[1])+1].cells[2].innerHTML=stock[2];
                  }
                });
            });
      });
}());
