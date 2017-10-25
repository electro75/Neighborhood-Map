var locations=[
{
	name: 'Home',
	position: {lat: 19.226557, lng: 72.971355},
	place_id:'ChIJBzhvR1655zsR1eL9rGQzpvM',
  category:['Home','All']
},{
	name: 'Whatta Waffle!',
	position: {lat: 19.258517, lng: 72.984844},
	place_id:'ChIJa4Rn-4y75zsRkq_i-j2XfGg',
  category:['Restaurants','All']
}];

var markers=[];
var map;
var detailsInfoWindow;
var categories=['Home','Restaurants','All'];

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
            title: locations[i].name,
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

  function setList(name){
    var i,j;
    var updatedList=[]
    for (j=0;j<locations.length;j++){
      for(i=0;i<locations[j].category.length;i++){
        if(name==locations[j].category[i]){
          updatedList.push(locations[j].name);
        }
      }
    }
    return updatedList;
  }

  function updateMarkers(list){
    var i,j;
    for(i=0;i<markers.length;i++){
      markers[i].setMap(null);
    }
    for(i=0;i<list.length;i++){
      for(var j=0; j<locations.length;j++){
        if(list[i]==locations[j].name){
          var marker = new google.maps.Marker({
            map: map,
            position: locations[j].position,
            title: locations[j].name,
            animation: google.maps.Animation.DROP,
            id:locations[j].place_id
          });
          markers.push(marker);
        }
      }
    }
    return;
  }

function mapViewModel(){
	
	var self=this;
  this.currentList=ko.observable(categories[2]);

	this.places=ko.observableArray();
	locations.forEach(function(obj){
		self.places.push(obj.name);
	});
	this.categs=ko.observableArray();
  categories.forEach(function(c){
    self.categs.push(c);
  });

  self.getDetails=function(name){
    var m;
    for(var i=0;i<markers.length;i++){
      if(name==markers[i].title){
        m=markers[i];
        break;
      }
    }
    getPlacesDetails(m, detailsInfoWindow);
    return;
  }

  self.updateList=function(categoryName){
    self.places.removeAll();
    var newList= setList(categoryName);
    for(var i=0; i<newList.length;i++){
      self.places.push(newList[i]);
    }
    self.currentList(categoryName);
    updateMarkers(newList);
  }
}

ko.applyBindings(new mapViewModel())