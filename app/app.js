var locations=[
{
	name: 'Home',
	position: {lat: 19.226557, lng: 72.971355},
	title: 'firstMarker'
},{
	name: 'Whatta Waffle',
	position: {lat: 19.258517, lng: 72.984844},
	title: 'secondMarker'
}];

var markers=[];
var map;
function initMap(){
	map=new google.maps.Map(document.getElementById('map'),{
		center:{lat: 19.2183, lng: 72.9781},
		zoom: 12
	});
	for(var i=0;i<locations.length;i++){
        var marker= new google.maps.Marker({
            map: map,
            position: locations[i].position,
            title: locations[i].title,
             animation: google.maps.Animation.DROP
        });
        markers.push(marker);
    }
    return;
};
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