
define([
    "./aircraftLimitProvider.js",
], function (
    aircraftLimitProvider
) {
// /src/dictionary/Aircraft_dictionary.json
    function aircraftPlugin() {

        function getAircraft_Dictionary() {
            return fetch('./json/Aircraft_dictionary.json').then(function (response) {
                return response.json();
            });

        }



        // An object provider builds Domain Objects
        var Aircraft_42_objectProvider = {
            get: function (identifier) {
                return getAircraft_Dictionary().then(function (dictionary) {
                    console.log("Aircraft_42-dictionary-plugin.js: identifier.key = " + identifier.key);
                    if (identifier.key === 'Aircraft_42') {
                        return {
                            identifier: identifier,
                            name: dictionary.name,
                            type: 'folder',
                            location: 'ROOT'
                        };
                    } else {
                        var measurement = dictionary.measurements.filter(function (m) {
                            return m.key === identifier.key;
                        })[0];

                        return {
                            identifier: identifier,
                            name: measurement.name,
                            type: 'Aircraft_42.telemetry',
                            telemetry: {
                                values: measurement.values
                            },
                            location: 'Aircraft_42.taxonomy:Aircraft_42'
                        };
                    }
                });
            }
        };

        // provides structure (for showing children)
        var Aircraft_42_compositionProvider = {
            appliesTo: function (domainObject) {
                return domainObject.identifier.namespace === 'Aircraft_42.taxonomy'
                    && domainObject.type === 'folder';
            },
            load: function (domainObject) {
                return getAircraft_Dictionary()
                    .then(function (dictionary) {
                        return dictionary.measurements.map(function (m) {
                            return {
                                namespace: 'Aircraft_42.taxonomy',
                                key: m.key
                            };
                        });
                    });
            }
        };

        // To add a new root : initialise a new root
        return function install(openmct) {
            // The addRoot function takes an "object identifier" as an argument
            openmct.objects.addRoot({
                namespace: 'Aircraft_42.taxonomy',
                key: 'Aircraft_42'
            });

            openmct.objects.addProvider('Aircraft_42.taxonomy', Aircraft_42_objectProvider);

            openmct.composition.addProvider(Aircraft_42_compositionProvider);

            openmct.types.addType('Aircraft_42.telemetry', {
                name: 'Aircraft_42 Telemetry Point',
                description: 'Telemetry of Aircraft_42',
                cssClass: 'icon-telemetry'
            });
            openmct.telemetry.addProvider(new aircraftLimitProvider());
        };
    }

    return aircraftPlugin;
});
