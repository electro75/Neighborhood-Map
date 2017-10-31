//This file gets makes an fetch request to open weather maps to 
// retrieve the weather of the selected area. It also makes the
 // use of jQuery to fill the details of the weather in a Modal.
$(function(){
	function get(url){
		return fetch(url,{
			method: 'get'
		});
	};

	function getJSON(url){
		return get(url).then(function(response){
			return response.json();
		}).catch(function(error){	//Error handling in case of an error.
			$('.modal-body').append("<h4>Unable to fetch data, please try again later.</h4>")
			console.log(error);
		});
	};
//weather details.
	var place;
	var temperature;
	var min_temp, max_temp;
	var humidity;
	var img_url, img_tag; //icon of the current weather.
	var clouds;

	getJSON('http://api.openweathermap.org/data/2.5/weather?id=1254661&appid=463212772e7b1d4c0fadb10da3b0272b')
	.then(function(response){
		//organisation of the data, if the data is successfully retrieved from the API
		place=response.name+", "+response.sys.country;
		temperature=Math.round(response.main.temp-273.15);
		min_temp=Math.round(response.main.temp_min-273.15);
		max_temp=Math.round(response.main.temp_max-273.15);
		humidity=response.main.humidity;
		weather_descr= response.weather[0].main;
		img_url="http://openweathermap.org/img/w/"+response.weather[0].icon+".png";
		clouds=response.clouds.all;
		
		$('.modal-body').append("<p>City: "+place+"</p>");
		$('.modal-body').append("<p>Current Temp: "+temperature+"°C</p>");
		$('.modal-body').append("<p>Min Temp: "+min_temp+"°C  Max Temp: "+max_temp+"°C</p>");
		$('.modal-body').append("<p>Weather: "+weather_descr+"<img src=\""+img_url+"\" alt="+"weather icon"+"/></p>");
		$('.modal-body').append("<p>Humidity: "+humidity+"%</p>");
		$('.modal-body').append("<p>Cloudiness: "+clouds+"%</p>");
		console.log(place);
		
	}).catch(function(error){	//Error handling in case of an error.
		$('.modal-body').append("<h4>Unable to fetch data, please try again later.</h4>");
		console.log(error);
	});
});