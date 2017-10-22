var locations=[
{
	name: 'Home',
	position: {lat: 19.226557, lng: 72.971355},
	title: 'firstMarker',
	place_id:'ChIJBzhvR1655zsR1eL9rGQzpvM'
},{
	name: 'Whatta Waffle',
	position: {lat: 19.258517, lng: 72.984844},
	title: 'secondMarker',
	place_id:'ChIJa4Rn-4y75zsRkq_i-j2XfGg'
}];

var markers=[];
var map;
var detailsInfoWindow;
function initMap(){
	map=new google.maps.Map(document.getElementById('map'),{
		center:{lat: 19.2183, lng: 72.9781},
		zoom: 12
		});
	detailsInfoWindow= new google.maps.InfoWindow();
	for(var i=0;i<locations.length;i++){
        var marker= new google.maps.Marker({
            map: map,
            position: locations[i].position,
            title: locations[i].title,
            animation: google.maps.Animation.DROP,
            id:locations[i].place_id
        });
        markers.push(marker);
        markers[i].addListener('click',function(){
        	getPlacesDetails(this, detailsInfoWindow);
        })
    }
    return;
};
    function getPlacesDetails(marker,infowindow) {
      var service = new google.maps.places.PlacesService(map);
      // console.log(marker.id);
      service.getDetails({
        placeId: marker.id
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Set the marker property on this infowindow so it isn't created again.
          infowindow.marker = marker;
          var innerHTML = '<div>';
          if (place.name) {
            innerHTML += '<strong>' + place.name + '</strong>';
          }
          if (place.formatted_address) {
            innerHTML += '<br>' + place.formatted_address;
          }
          if (place.formatted_phone_number) {
            innerHTML += '<br>' + place.formatted_phone_number;
          }
          if (place.opening_hours) {
            innerHTML += '<br><br><strong>Hours:</strong><br>' +
                place.opening_hours.weekday_text[0] + '<br>' +
                place.opening_hours.weekday_text[1] + '<br>' +
                place.opening_hours.weekday_text[2] + '<br>' +
                place.opening_hours.weekday_text[3] + '<br>' +
                place.opening_hours.weekday_text[4] + '<br>' +
                place.opening_hours.weekday_text[5] + '<br>' +
                place.opening_hours.weekday_text[6];
          }
          if (place.photos) {
            innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                {maxHeight: 100, maxWidth: 200}) + '">';
          }
          innerHTML += '</div>';
          infowindow.setContent(innerHTML);
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      });
    }
function mapViewModel(){
	// initMap();
	var self=this;
	this.places=ko.observableArray();
	locations.forEach(function(obj){
		self.places.push(obj.name);
	});
	console.log(this.places()[0]);
}

ko.applyBindings(new mapViewModel())