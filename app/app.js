
var width=document.documentElement.clientWidth; //viewport width.
var markers=[]; //array of all the markers.
var map; //The Map
var detailsInfoWindow; //Infowindow to display the details of a particular marker
var categories=['Restaurants','Movie Theaters','Shopping','All']; //Categories of the Places chosen
var selectedMarkers=[]; //Stores one marker ie, the active marker
var selectedIcon, defaultIcon; //markers with differnt colors.
var activeMarker='';
var shown=false;
var mvm= new mapViewModel();

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
  alert('Google Maps Error! Please try again later.');
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
    activeMarker=this.title;
    mvm.isShown(true);
    mvm.getTipsObject();
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
        mvm.isShown(false);
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
  this.weatherCurrent=ko.observable();
  this.markerActive=ko.observable('');
  this.tipsArray=ko.observableArray();
  this.isShown=ko.observable(shown);

//changes the color of the marker that is selected for the list view
  self.selectMarker=function(name){
    var m= new google.maps.Marker({});
    activeMarker=name;
    for(var i=0;i<markers.length;i++){
      if(name==markers[i].title){
        m=markers[i];
        break;
      }
    }
    self.markerActive(name);
    self.isShown(true);
    self.getTipsObject();
    changeMarkerColor(m);
    getPlacesDetails(m,detailsInfoWindow);
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
    if(selectedMarkers[0]){
    selectedMarkers[0].setIcon(defaultIcon);
  }
    activeMarker='';
    self.isShown(false);
  };

  self.getTipsObject=function(){
      self.markerActive(activeMarker);
      var fs_venueID="";
      self.tipsArray.removeAll();
      for(var i=0;i<locations.length;i++){
        if(locations[i].name==self.markerActive()){
          fs_venueID=locations[i].fs_id;
        }
      }
      getfourSquareJSON(fs_venueID).then(function(response){
        data=response.response.venue.tips;
        for(var i=0; i<3; i++){
          var name= data.groups[0].items[i].user.firstName +" "+ data.groups[0].items[i].user.lastName;
          self.tipsArray.push({
            name: name,
            review: data.groups[0].items[i].text
          });
        }
      return;
    })
    .catch(function(error){
      $('.card').append("<h3>Unable to fetch data, please refresh the page and try again later.</h3>");
      console.log(error);
    }); 
  };
//gets the current weather of the area from open weather maps API   
  self.getWeather=function(){
      getWeatherJSON('http://api.openweathermap.org/data/2.5/weather?id=1254661&appid=463212772e7b1d4c0fadb10da3b0272b')
      .then(function(response){
    //organisation of the data, if the data is successfully retrieved from the API
        console.log(response);
        self.weatherCurrent({
          place: response.name+", "+response.sys.country,
          temperature: Math.round(response.main.temp-273.15),
          min_temp: Math.round(response.main.temp_min-273.15),
          max_temp: Math.round(response.main.temp_max-273.15),
          humidity: response.main.humidity,
          // img_url: "http://openweathermap.org/img/w/"+response.weather[0].icon+".png",
          clouds: response.clouds.all
        });
      }).catch(function(error){ //Error handling in case of an error.
          $('.modal-body').append("<h3>Unable to fetch data, please refresh the page and try again later.</h3>");
          console.log(error);
      });
  };
}
ko.applyBindings(mvm);
