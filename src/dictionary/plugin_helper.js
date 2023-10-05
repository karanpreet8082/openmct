define([

], function (


    // aircraftLimitProvider.prototype.getLimitEvaluator = function (domainObject) {
    //     return {
    //         evaluate: function (datum, valueMetadata) {
    //             var key = domainObject.identifier.key
    //             var value = valueMetadata && valueMetadata.key;
                                
    //             if (datum[value] > RED_HIGH[key]) {
    //                 return LIMITS.rh;
    //             }

    //             if (datum[value] < RED_LOW[key]) {
    //                 return LIMITS.rl;
    //             }

    //             if (datum[value] > YELLOW_HIGH[key]) {
    //                 return LIMITS.yh;
    //             }

    //             if (datum[value] < YELLOW_LOW[key]) {
    //                 return LIMITS.yl;
    //             }
    //         }
    //     };
    // };

    
) {
    var RED_HIGH = {
            
        },
        RED_LOW = {
            'airspeedVal': 20,
            'groundspeedVal': 20
        },

        YELLOW_HIGH = {
            
        },
        YELLOW_LOW = {
            'airspeedVal': 21,
            'groundspeedVal': 21
        },
        
        LIMITS = {
            rh: {
                cssClass: "is-limit--upr is-limit--red",
                low: RED_HIGH,
                high: Number.POSITIVE_INFINITY,
                name: "Red High"
            },
            rl: {
                cssClass: "is-limit--lwr is-limit--red",
                high: RED_LOW,
                low: Number.NEGATIVE_INFINITY,
                name: "Red Low"
            },
            yh: {
                cssClass: "is-limit--upr is-limit--yellow",
                low: YELLOW_HIGH,
                high: RED_HIGH,
                name: "Yellow High"
            },
            yl: {
                cssClass: "is-limit--lwr is-limit--yellow",
                low: RED_LOW,
                high: YELLOW_LOW,
                name: "Yellow Low"
            }
        };



        

    function aircraftLimitProvider() {

    }





    aircraftLimitProvider.prototype.supportsLimits = function (domainObject) {
        return domainObject.type === 'Aircraft_42.telemetry';
    };

    aircraftLimitProvider.prototype.getLimitEvaluator = function (domainObject) {
        return {
            evaluate: function (datum, valueMetadata) {
                var key = domainObject.identifier.key
                var value = valueMetadata && valueMetadata.key;
                                
                if (datum[value] > RED_HIGH[key]) {
                    return LIMITS.rh;
                }

                if (datum[value] < RED_LOW[key]) {
                    return LIMITS.rl;
                }

                if (datum[value] > YELLOW_HIGH[key]) {
                    return LIMITS.yh;
                }

                if (datum[value] < YELLOW_LOW[key]) {
                    return LIMITS.yl;
                }
            }
        };
    };

    return aircraftLimitProvider;
});
