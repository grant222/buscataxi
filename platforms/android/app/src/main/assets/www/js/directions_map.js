$(document).ready(function () {


    var directionDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });

        var myOptions = {
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }

        map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        directionsDisplay.setMap(map);
        calcRoute();
    }

    function calcRoute() {

        var waypts = [];

        /*stop = new google.maps.LatLng(-23.540169 - 46.864876)
waypts.push({
    location: stop,
    stopover: true
});
stop = new google.maps.LatLng(51.945032, 6.465776)
waypts.push({
    location: stop,
    stopover: true
});
stop = new google.maps.LatLng(51.945538, 6.469413)
waypts.push({
    location: stop,
    stopover: true
});
stop = new google.maps.LatLng(51.947462, 6.467941)
waypts.push({
    location: stop,
    stopover: true
});
stop = new google.maps.LatLng(51.945409, 6.465562)
waypts.push({
    location: stop,
    stopover: true
});
stop = new google.maps.LatLng(51.943700, 6.462096)
waypts.push({
    location: stop,
    stopover: true
});*/

        start = new google.maps.LatLng(-23.540169, -46.864876);
        end = new google.maps.LatLng(-23.5953251, -46.6853225);

        createMarker(start);

        var request = {
            origin: start,
            destination: end,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.DirectionsTravelMode.WALKING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                var route = response.routes[0];
            }
        });
    }

    function createMarker(latlng) {

        var marker = new google.maps.Marker({
            position: latlng,
            map: map
        });
    }

    initialize();







});
