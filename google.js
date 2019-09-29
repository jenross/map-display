let resultsArr = [];
let randomPick;

const randomize = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });

var input = document.getElementById('enterLocation');
var autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.bindTo('bounds', map);
autocomplete.setFields(
    ['address_components', 'geometry', 'icon', 'name']);

var infowindow = new google.maps.InfoWindow();
var infowindowContent = document.getElementById('infowindow-content');
infowindow.setContent(infowindowContent);

var marker = new google.maps.Marker({
  map: map,
  anchorPoint: new google.maps.Point(0, -29)
});

autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    $(".create-hangout").on("click", function(event) {
        event.preventDefault();
        console.log("working");
        const APIKEY = "AIzaSyDWLRgKxz3nTinzcUXCyjM1DNpe9e4_g2w";
        let lat = place.geometry.location.lat();
        console.log(lat);
        let lng = place.geometry.location.lng();
        console.log(lng);
        let initialQueryURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${APIKEY}&location=${lat},${lng}&radius=1000&type=restaurant`;
        $.ajax({
            url: initialQueryURL,
            method: "GET"
        }).then(function(response) {
            for (let i = 0; i < response.results.length; i++) {
                let place_id = response.results[i].place_id;
                resultsArr.push(place_id);
                randomPick = resultsArr[randomize(0, resultsArr.length - 1)];
            }
            console.log(randomPick);
            let pickedQueryURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${APIKEY}&place_id=${randomPick}`;
            $.ajax({
                url: pickedQueryURL,
                method: "GET"
            }).then(function(response) {
                // let pickLat = response.result.geometry.location.lat;
                // let pickLng = response.result.geometry.location.lng;
                let pickName = response.result.name;
                // let pickAddress = response.result.formatted_address;
                // let pickIcon = response.result.icon;
                // let pickOpenNow = response.result.opening_hours.open_now;
                // let pickWebsite = response.result.website;
                console.log(pickName);
                // $("#")
          
                if (response.result.geometry.viewport) {
                    map.fitBounds(response.result.geometry.viewport);
                } else {
                    map.setCenter(response.result.geometry.location);
                    map.setZoom(17);  // Why 17? Because it looks good.
                }
                marker.setPosition(response.result.geometry.location);
                marker.setVisible(true);

                var address = response.result.formatted_address;
                // if (response.result.formatted_address) {
                //     address = [
                //     (response.result.address_components[0] && response.result.address_components[0].short_name || ''),
                //     // (response.result.address_components[1] && response.result.address_components[1].short_name || ''),
                    // (response.result.address_components[2] && response.result.address_components[2].short_name || '')
                //     ].join(' ');
                // }
                // var address = '';
                // if (response.result.address_components) {
                //     address = [
                //     (response.result.address_components[0] && response.result.address_components[0].short_name || ''),
                //     (response.result.address_components[1] && response.result.address_components[1].short_name || ''),
                //     (response.result.address_components[2] && response.result.address_components[2].short_name || '')
                //     ].join(' ');
                // }

                infowindowContent.children['place-icon'].src = response.result.icon;
                infowindowContent.children['place-name'].textContent = response.result.name;
                infowindowContent.children['place-address'].textContent = address;
                infowindow.open(map, marker);
                });
            });
        });
    });
}