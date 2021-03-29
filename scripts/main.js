mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpYW52ZHAiLCJhIjoiY2ttbHB5NmpjMDA1NDJ1cGUwZ2J1enlvaCJ9.WBVtoZo5bH_VTa3HkWA-Mw';

var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '532f5578753398a48a6e52978b859df8';

function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='532f5578753398a48a6e52978b859df8';
	var city = document.getElementById('city').value;

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}


function onAPISucces(response) {

	var type = response.weather[0].description;

	var degC = Math.floor(response.main.temp - 273.15);

	var weatherBox = document.getElementById('weather');

	var iconUrl = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';

	icon = '<div class="icon"> <img src="'+iconUrl+'"> </div>';

	weatherBox.innerHTML = degC + '&#176;C <br>' + type + icon;
}


function onAPIError(error) {
	console.error('Fetch request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'Did you enter a correct city?'; 
}

document.getElementById('getWeather').onclick = function(){
	getAPIdata();
};

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v11',
  center: [5.508852, 52.142480],
  zoom: 7
});