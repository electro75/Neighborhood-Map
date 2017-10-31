//chosen locations
var locations=[
{
	name: 'Dcrepes Cafe',
	position: {lat: 19.226448, lng: 72.970598},
	place_id: 'ChIJLbkoFV655zsRDtq0jP6inTM',
  category: ['Cafes','All']
},{
	name: 'Whatta Waffle!',
	position: {lat: 19.258517, lng: 72.984844},
	place_id: 'ChIJa4Rn-4y75zsRkq_i-j2XfGg',
  category: ['Cafes','All']
},{
  name: 'Mad House',
  position: {lat: 19.265667, lng: 72.970099},
  place_id: 'ChIJjQ2p_Je75zsR5rOk07OEfi4',
  category: ['Cafes','All']
},{
  name: 'The J',
  position: {lat: 19.227216, lng: 72.973588},
  place_id: 'ChIJMVdtGF655zsR2lXzlIiM9XE',
  category: ['Cafes','All']
},{
  name: 'Cinepolis',
  position: {lat: 19.208823, lng: 72.970930},
  place_id: 'ChIJY7Ssij-55zsR37R9IKCUaKM',
  category: ['Movie Theaters','All']
},{
  name: 'Cinema star',
  position: {lat: 19.217179, lng: 72.981166},
  place_id: 'ChIJpyNFi0W55zsRZUDw9WbeBFg',
  category: ['Movie Theaters','All']
},{
  name: 'INOX',
  position: {lat: 19.203169, lng: 72.964992},
  place_id: 'ChIJs-9eHxS55zsRV4CkVxCtoyU',
  category: ['Movie Theaters','All']
},{
  name: 'Hatrics Turf',
  position: {lat: 19.239037,lng: 72.967199},
  place_id: 'ChIJW8MVUdy75zsR-kKsYaWAydQ',
  category: ['Football Turfs','All']
},{
  name: 'Young Guns',
  position: {lat: 19.219653,lng: 72.956220},
  place_id: 'ChIJObX3kHq55zsRBpBx3ZMEKPY',
  category: ['Football Turfs','All']
}];

var width=document.documentElement.clientWidth; //viewport width.
var markers=[]; //array of all the markers.
var map; //The Map
var detailsInfoWindow; //Infowindow to display the details of a particular marker
var categories=['Cafes','Movie Theaters','Football Turfs','All']; //Categories of the Places chosen
var selectedMarkers=[]; //Stores one marker ie, the active marker
var selectedIcon, defaultIcon; //markers with differnt colors.

//Initiation of Map
function initMap(){
	map=new google.maps.Map(document.getElementById('map'),{
		center:{lat: 19.2183, lng: 72.9781},
		zoom: 12
		});
  selectedIcon= makeMarkerIcon('FFFF24');
  defaultIcon= makeMarkerIcon('0091FF');

	detailsInfoWindow= new google.maps.InfoWindow();
	for(var i=0;i<locations.length;i++){
        markers.push(makeMarker(i));
    }
    return;
}

//handles google map error and gives a message to the user.
function googleMapsError(){
  document.getElementById('map').setContent('<h3>Unable to load Map. Please Try again later</h3>');
  return;
}
//A function that initilises properties of the marker of the given location.
function makeMarker(i){
  var marker= new google.maps.Marker({
    map: map,
    position: locations[i].position,
    title: locations[i].name,
    animation: google.maps.Animation.DROP,
    id:locations[i].place_id,
    icon: defaultIcon,
    });
  marker.addListener('click',function(){
    getPlacesDetails(this, detailsInfoWindow);
    changeMarkerColor(this);
  });
  return marker;
}

//Gets details of a marker that is clicked on.
function getPlacesDetails(marker,infowindow) {
  var service = new google.maps.places.PlacesService(map);
  if(width<550){
    closeNav();
  }
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
        marker.setIcon(defaultIcon);
      });
    }
  });
}

//returns an array with all the names of the places that have the 
//catgeory which is accepted as `name`. 
function setList(name){
  var i,j;
  var updatedList=[];
  for (j=0;j<locations.length;j++){
    for(i=0;i<locations[j].category.length;i++){
      if(name==locations[j].category[i]){
        updatedList.push(locations[j].name);
      }
    }
  }
  return updatedList;
}

//updates the `Visible` property of the unmatched marker to 'false'
function updateMarkers(list){
  var i,j;
  var bounds = new google.maps.LatLngBounds();
  for(i=0; i<locations.length;i++){
    for(j=0; j<list.length; j++){
      if(locations[i].name!=list[j]){
        markers[i].setVisible(false);
      }else{
        markers[i].setVisible(true);
        bounds.extend(markers[i].position);
        break;
      }
    }
  }
  map.fitBounds(bounds);
  return;
}

//This function makes the icon of a marker by setting the color.
function makeMarkerIcon(markerColor){
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;    
}

//toggles the marker color according to selection  
function changeMarkerColor(marker){
  if(selectedMarkers.length>0){
    selectedMarkers[0].setIcon(defaultIcon);
    selectedMarkers=[];
  }
  marker.setIcon(selectedIcon);
  selectedMarkers.push(marker);
  return;
}

//the view model of the app. Controls all the list functionalities
function mapViewModel(){

  var self=this;
//Contains and monitors the title of the list that is being displayed  
  this.currentListName=ko.observable(categories[3]);

//A ko.observableArray that contains and monitors the names of the displayed makers
  this.places=ko.observableArray();
  locations.forEach(function(obj){
   	self.places.push(obj.name);
  });
  this.categs=ko.observableArray();
  categories.forEach(function(c){
    self.categs.push(c);
  });

//changes the color of the marker that is selected for the list view
  self.selectMarker=function(name){
    var m= new google.maps.Marker({});
    for(var i=0;i<markers.length;i++){
      if(name==markers[i].title){
        m=markers[i];
        break;
      }
    }
    changeMarkerColor(m);
    map.setCenter(m.position);
    detailsInfoWindow.close();
    return;
  };

//triggered when a filter is selected from the dropdown menu.
  self.updateList=function(categoryName){
    self.places.removeAll();
    var newList= setList(categoryName);
    for(var i=0; i<newList.length;i++){
      self.places.push(newList[i]);
    }
    self.currentListName(categoryName);
    updateMarkers(newList);
    detailsInfoWindow.close();
    selectedMarkers[0].setIcon(defaultIcon);
  };
}

ko.applyBindings(new mapViewModel());