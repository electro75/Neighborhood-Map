//this file fetches data from foursquare API.

var apiURL = 'https://api.foursquare.com/v2/venues/';
var foursquareClientID = 'Z5QNRZ11Q1HJRYRCFYHRSTCR234X51N3PGPWN5FO3RITLU2B'
var foursquareSecret ='XPUYVAS5XTCOQWWGD1NKDIOVGMSQMQ5ARGWMFIWTISMM4JFO';
var foursquareVersion = '20170115';

	function getTips(url){
		return fetch(url,{
			method: 'get'
		});
	}

	function getfourSquareJSON(venueID){
		var url= apiURL + venueID + '?client_id=' + foursquareClientID +  '&client_secret=' + foursquareSecret +'&v=' + foursquareVersion;
		return getTips(url).then(function(response){
			return response.json();
		});
	}
	