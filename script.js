window.pinDistance = 0

function loadMapScenario() {
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});
    var center = map.getCenter();
    var Events = Microsoft.Maps.Events;
    var Location = Microsoft.Maps.Location;
    var Pushpin = Microsoft.Maps.Pushpin;

    var pins = [
        new Pushpin(new Location(center.latitude, center.longitude), {
            color: '#f00',
            title: 'You',
            draggable: true
        }),
        new Pushpin(new Location(center.latitude, center.longitude - 0.1), {
            color: '#0f0',
            title: 'Them',
            draggable: true
        })
    ];
    map.entities.push(pins);

    Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
        window.pinDistance = Microsoft.Maps.SpatialMath.getDistanceTo(pins[0].getLocation(), pins[1].getLocation(), Microsoft.Maps.SpatialMath.DistanceUnits.Miles)
        textChange()
    })



    Events.addHandler(pins[0], 'dragend', function() {
        Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
            window.pinDistance = Microsoft.Maps.SpatialMath.getDistanceTo(pins[0].getLocation(), pins[1].getLocation(), Microsoft.Maps.SpatialMath.DistanceUnits.Miles)
            textChange()
        })
    })
    Events.addHandler(pins[1], 'dragend', function() {
        Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function() {
            window.pinDistance = Microsoft.Maps.SpatialMath.getDistanceTo(pins[0].getLocation(), pins[1].getLocation(), Microsoft.Maps.SpatialMath.DistanceUnits.Miles)
            textChange()
        })
    });
}

function textChange() {
    var weight1 = document.getElementById('weight1').value
    weight2 = document.getElementById('weight2').value,
        meters = window.pinDistance * 1.60934,
        mass1 = parseFloat(weight1 ? weight1 : 0) * 2.205,
        mass2 = parseFloat(weight2 ? weight2 : 0) * 2.205,
        attraction = (((6.7 * Math.pow(10, -11) * mass1 * mass2) / Math.pow(meters, 2)) * 1000000000000)
    document.getElementById('text').innerText = attraction + ' picoNewtons (pN)'
}
