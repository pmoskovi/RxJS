/**
 * Created by pmoskovi on 5/14/15.
 */

(function() {

Kaazing.Messaging.newContext("ws://wallet.kaazing.com/jms")
      .then(function(context) {
          context.newSubscriber ("stock")
            .then(function(subscriber) {

              var stream1 = subscriber.map (function (x) {
                console.log (x);
                return parseFloat(x.split(":")[2]);

              })
              .take (3)
              .average()
              .subscribe(function (x) {
                console.log("Prashant's average: " + x);
              });

              // var stream1 = subscriber.map (function (x) {
              //   return parseFloat(x.split(":")[2]);
              // })
              // .take (3)
              // .subscribe (function (x) {
              //   console.log ('Prashant Values: ' + x);
              // })


              // source1.map(function(x) {
              //   return new Number(x.split(":")[2]);
              // })
              // .max()
              // .forEach (function(x) {
              //   console.log ('Max: ' + x);
              // });

              // console.log ('Average: ' + source1.average());


              //  source2 = subscriber.take (3)
              // source1.subscribe (function(x) {
              //   console.log ('Observer1: ' + x);
              //   // console.log (x);
              // });
              //
              // 
              // source1.subscribe (function(x) {
              //   console.log ('Observer2: ' + x);
              //   // console.log (x);
              // });

              //
              // source1.forEach (function(x) {
              //   console.log (x);
              //   // console.log (x);
              // });

              // source1.forEach (function(x) {
              //   console.log (x);
              //   // console.log (x);
              // });


              // subscriber.subscribe (
              //   function (x) {
              //     // console.log('onNext: %s', x);
              //     },
              //   function (e) { console.log('onError: %s', e); },
              //   function ()  { console.log('onCompleted'); }
              // )

            });
        });

// var subscription = source.subscribe(
//     function (x) { console.log('onNext: %s', x); },
//     function (e) { console.log('onError: %s', e); },
//     function ()  { console.log('onCompleted'); });

            // .then(function(subscriber) {
            //     subscriber.map(function(quote) {
            //       var splitStock = quote.split(":");
            //       // splitStock[2]="$"+splitStock[2];
            //       // console.log (splitStock);
            //       return splitStock[0];
            //     })
            //     .take (100)
            //     .delay(new Date(Date.now() + 1000))
            //     .forEach (function(x) {console.log (x)})
            // })


  // var source = Rx.Observable.fromArray([1,3,5,7,9,2,4,6,8,9])
  //              .maxBy( function (x) { return x; } );

  // var subscription = source.subscribe(
  //   function (x) { console.log('Next: ' + x[0]); },
  //   function (err) { console.log('Error: ' + err); },
  //   function () { console.log('Completed'); }
  // );

}());
