var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var sao_paulo = new google.maps.LatLng(-23.549865, -46.634021); //set to praça da sé SP marco 0
    var mapOptions = {
        zoom: 8,
        center: sao_paulo
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
}

function calcRoute() {

    $('html, body').animate({
        scrollTop: ($('.masthead').first().offset().top)
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

                console.log(alert(route.legs[i].start_location.lat() + " " + route.legs[i].start_location.lng()));

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

google.maps.event.addDomListener(window, 'load', initialize);
