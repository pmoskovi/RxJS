/**
 * Created by pkhanal on 5/7/15.
 */

(function() {
    importScripts("../lib/RxJS/rx.lite.compat.js", "../lib/JMS.js", "../lib/reactive-messaging.js");

    Kaazing.Messaging.newContext("ws://wallet.kaazing.com/jms")
        .then(function(context) {
            context.newSubscriber("canvas.drawing")
                .then(function(subscriber) {
                    subscriber
                        .subscribe(function(drawingInfo) {
                            self.postMessage({"type": "draw", "param": drawingInfo});
                        });
                });

            context.newSubscriber("canvas.control")
                .then(function(subscriber) {
                    subscriber
                        .subscribe(function(controlMessage) {
                            self.postMessage({"type": "clear"});
                        });
                });
        });
})();