//this file fetches data from open weather maps API.
	function getWeatherData(url){
		return fetch(url,{
			method: 'get'
		});
	};

	function getWeatherJSON(url){
		return getWeatherData(url).then(function(response){
			return response.json();
		}).catch(function(error){	//Error handling in case of an error.
			$('.modal-body').append("<h4>Unable to fetch data, please try again later.</h4>")
			console.log(error);
		});
	};
