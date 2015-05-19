/**
 * Created by pkhanal on 4/8/15.
 */

(function(){
    var $logger = document.getElementById("logger");

    // 1. Fetch maximum value of apple stock in 5 seconds interval.
    //    - Filter message corresponding to apple stock
    //    - Transform message object to a number representing the stock quote
    //    - Buffer all the quotes received over 5 seconds
    //    - Find maximum value among the buffered quotes and emit the maximum value
    var connectionFactory = new JmsConnectionFactory("ws://localhost:8001/jms");
    var connectFuture = connectionFactory.createConnection(function() {
        if (!connectFuture.exception) {
            var connection = connectFuture.getValue();
            connection.setExceptionListener(function(error) {
                console.log("Exception: " + error);
            });

            connection.start(function(){
                var session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
                var topic = session.createTopic("/topic/ticker.AAPL");
                var consumer = session.createConsumer(topic);

                consumer.setMessageListener(function(message) {
                    appleStockTickerReceived(message);
                });

            });
        }
        else {
            console.log("Exception: " + error);
        }
    });

    var quoteBuffer = [];
    var timer = null;
    function appleStockTickerReceived(message) {
        var quote = getQuote(message);
        quoteBuffer.push(quote);
        if (timer == null) {
            timer = setInterval(function() {
                var intervalBuffer = quoteBuffer;
                quoteBuffer = [];

                // find maximum quote
                var maxQuote = intervalBuffer[0];
                for (var i = 1; i < intervalBuffer.length; i++) {
                    if (intervalBuffer[i] > maxQuote) {
                        maxQuote = intervalBuffer[i];
                    }
                }
                var message = "[" + new Date() + "]Maximum quote of Apple stock in last 5 seconds: " + maxQuote;
                console.log(message);
                $logger.innerHTML += message + '<BR />';

            }, 5000);
        }
    }

    function getQuote(message) {
        // transform JMS message into a number that represents the stock quote
        return parseInt(message.getStringProperty("price"));
    }

})();