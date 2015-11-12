var googleMap;

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
    var image="red.png";
    for (var i = 0; i < limit; i++) {
        location = new google.maps.LatLng(data[i].latitude, data[i].longitude);

        if(i==1){
            googleMap = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: location
            });
        }

        generateChartDiv(data[i]);


        var marker = new google.maps.Marker({
            position: location,
            map: googleMap,
            icon: image,
            title:' |   Address : ' + data[i].address,
            customInfo:'sadsad'
        });


        if (i == 1) {
            googleMap.setCenter(location)

        }



    }


}