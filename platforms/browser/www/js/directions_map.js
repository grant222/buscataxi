var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var lat;
var long;

function initialize(lat, long) {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var sao_paulo = new google.maps.LatLng(lat, long); //posicao atual
    var mapOptions = {
        zoom: 8,
        center: sao_paulo
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
}


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    google.maps.event.addDomListener(window, 'load', initialize(crd.latitude, crd.longitude));

};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);


navigator.geolocation.getCurrentPosition(function (position) {
    var geocoder = new google.maps.Geocoder();
    var latLng = new google.maps.LatLng(
        position.coords.latitude, position.coords.longitude);
    geocoder.geocode({
        'latLng': latLng
    }, function (results, status) {
        for (var i = 0; i < results[0].address_components.length; i++) {
            var address = results[0].address_components[i];
            if (address.types[0] == "postal_code") {
                /* $('#zipcode').html(address.long_name);
 $('#location').html(results[0].formatted_address);
 $('#showMyLocation').hide();*/

                $("#start").val(results[0].formatted_address);

            }
        }
    });
});



function calcRoute() {

    $('html, body').animate({
        scrollTop: ($('#table_result').first().offset().top)
    }, 500);


    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    /*for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected == true) {
        waypts.push({
            location: checkboxArray[i].value,
            stopover: true
        });
    }
}*/

    var request = {
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions_panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {

                //console.log(alert(route.legs[i].start_location.lat() + " " + route.legs[i].start_location.lng()));

                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<br><br><b>Sua rota: '
                '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + '<br> até ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br> <b>Aproximadamente:<b> ';
                summaryPanel.innerHTML += route.legs[i].duration.text + '<br><br>';
                summaryPanel.innerHTML += '<button id="comparar" type="button" class="btn btn-primary" onclick="calcRoute();">COMPARAR VALORES</button><br><br>';
            }
        }
    });
}
