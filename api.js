// This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let typeOfPlace; 
let cafe = document.getElementById('cafe');
let restaurant = document.getElementById('restaurant');
let bar = document.getElementById('bar');
let locationSearch; 
let place; 
let resultsArr = [];
let randomPick;
let groupArr = [];
var map;
var service;
var infowindow;

// function initMap() {
//     var sydney = new google.maps.LatLng(-33.867, 151.195);

//     infowindow = new google.maps.InfoWindow();

//     map = new google.maps.Map(
//         document.getElementById('map'), {center: sydney, zoom: 15});

//     var request = {
//         query: 'Museum of Contemporary Art Australia',
//         fields: ['name', 'geometry'],
//     };

//     service = new google.maps.places.PlacesService(map);

//     service.findPlaceFromQuery(request, function(results, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//         }

//         map.setCenter(results[0].geometry.location);
//         }
//     });
// }

// function createMarker(place) {
//     var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//     });

//     google.maps.event.addListener(marker, 'click', function() {
//         infowindow.setContent(place.name);
//         infowindow.open(map, this);
//     });
// }

const randomize = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// let service = new google.maps.places.PlacesService(map);

// let placeFilter = typeOfPlace.id; 
function autocompleteSearch() {
    let initialLocationSearch = document.getElementById('enterLocation');
    let autocomplete = new google.maps.places.Autocomplete(initialLocationSearch);
    place = autocomplete.getPlace();
    console.log(place);
    // let lat = place.geometry.location.lat();
    // console.log(lat);
    // let lng = place.geometry.location.lng();
    // console.log(lng);
}

$(".create-hangout").on("click", function(event) {
    event.preventDefault();
    console.log("working");
    const APIKEY = "AIzaSyDWLRgKxz3nTinzcUXCyjM1DNpe9e4_g2w";
    let place = autocomplete.getPlace();
    console.log(place.geometry.location);
        locationSearch = place.geometry.location; 
        let lat = place.geometry.location.lat();
        console.log(lat);
        let lng = place.geometry.location.lng();
        console.log(lng);
        
        let initialQueryURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${APIKEY}&location=${locationSearch}&radius=1000&type=restaurant`;
        $.ajax({
            url: initialQueryURL,
            method: "GET"
        }).then(function(response) {
            // console.log(response);
            for (let i = 0; i < response.results.length; i++) {
                let place_id = response.results[i].place_id;
                // let place_name = response.results[i].name;
                // let open = response.results[i].opening_hours.open_now;
                // let photoResult = response.results[i].photos[0].html_attributions;
                // let address = response.results[i].vicinity;
                resultsArr.push(place_id);
                randomPick = resultsArr[randomize(0, resultsArr.length - 1)];
            }
            console.log(randomPick);
            let pickedQueryURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${APIKEY}&place_id=${randomPick}`;
            $.ajax({
                url: pickedQueryURL,
                method: "GET"
            }).then(function(response) {
                let pickLat = response.result.geometry.location.lat;
                let pickLng = response.result.geometry.location.lng;
                let pickName = response.result.name;
                let pickAddress = response.result.formatted_address;
                let pickIcon = response.result.icon;
                let pickOpenNow = response.result.opening_hours.open_now;
                let pickWebsite = response.result.website;
                console.log(pickName);
                // $("#")
            });
    });
// });