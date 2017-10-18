var map;
function initMap(){
	map=new google.maps.Map(document.getElementById('map'),{
		center:{lat: 19.2183, lng: 72.9781},
		zoom: 12
	});
}