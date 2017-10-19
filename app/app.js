var locations=[
{
	name: 'Home',
	position: {lat: 19.226557, lng: 72.971355},
	title: 'firstMarker'
}];

var markers=[];
var map;
function initMap(){
	map=new google.maps.Map(document.getElementById('map'),{
		center:{lat: 19.2183, lng: 72.9781},
		zoom: 15
	});
	for(var i=0;i<locations.length;i++){
        var marker= new google.maps.Marker({
            map: map,
            position: locations[i].position,
            title: locations[i].title
        });
        markers.push(marker);
    }
};
function mapViewModel(){
	var self=this;
	this.places=ko.observableArray();
	locations.forEach(function(obj){
		self.places.push(obj.name);
		// console.log(self.places()[0])
	});
	console.log(this.places()[0]);
}

ko.applyBindings(new mapViewModel())