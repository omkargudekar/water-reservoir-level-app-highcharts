var googleMap;


var mapStyle=[
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#edd5ca"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#f49935"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#fad959"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "saturation": 30
            },
            {
                "lightness": 49
            },
            {
                "color": "#65bcb5"
            }
        ]
    }
];


function loadLocaionFile() {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'location.json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {

                drawMap(JSON.parse(xhr.responseText));


            }
        }
        xhr.send();
    }
    catch (err) {
        console.log(err.message);
    }
}


function drawMap(data) {

    var data=data.locations.location;
    var location = undefined
    var limit = data.length;


    for (var i = 0; i < limit; i++) {


        location = new google.maps.LatLng(data[i].latitude, data[i].longitude);

        if(i==1){
            googleMap = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: location
            });
        }


        data[i].divCounter=generateChartDiv(data[i]);
        var image="http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|FF0000|12|_|"+data[i].divCounter;
        var infowindow = new google.maps.InfoWindow({
            content: data[i].address
        });

        var marker = new google.maps.Marker({
            position: location,
            map: googleMap,
            icon: image,
            title:' |   Address : ' + data[i].address,
        });

        marker.addListener('click', function() {
            infowindow.open(googleMap, marker);
        });

        infowindow.open(googleMap, marker);

        if (i == 1) {
            googleMap.setOptions({styles: mapStyle});
            googleMap.setCenter(location)

        }

    }

    setInterval(function(){

        $('#info').empty();

        for (var i = 0; i < limit; i++) {

            generateChartDiv(data[i]);

        }

    }, 3000);



}
