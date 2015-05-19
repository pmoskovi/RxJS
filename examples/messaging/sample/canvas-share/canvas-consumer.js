/**
 * Created by pkhanal on 5/7/15.
 */

(function() {
    var canvas = document.getElementById('demo');
    var drawingContext = canvas.getContext("2d");
    if (!drawingContext) {
        // Error
        return;
    }

    var worker = Rx.DOM.fromWebWorker('worker/messaging-worker.js');

    worker.subscribe(function(messageEvent) {
        var data = messageEvent.data;
        switch (data.type) {
            case "draw":
                var drawingInfo = JSON.parse(data.param);
                drawingContext.moveTo(drawingInfo.first.offsetX, drawingInfo.first.offsetY);
                drawingContext.lineTo(drawingInfo.second.offsetX, drawingInfo.second.offsetY);
                drawingContext.stroke();
                break;
            case "clear":
                drawingContext.clearRect(0, 0, canvas.width, canvas.height);
                drawingContext.beginPath();
                break;
        }
    });
})();
