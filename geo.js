var geo = navigator.geolocation;

var opciones = {}

function geo_error(){
	console.log("No puedo detectar donde estás");
}

function geo_exito(posicion){
	var lat = posicion.coords.latitude;
	var lon = posicion.coords.longitude;
	var mapa = new Image();
	mapa.src = "http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=300x300&sensor=false&center="+lat+","+lon;
	$('#geo').append(mapa);

	obtenerGeoInformacion(lat, lon);

}

geo.getCurrentPosition(geo_exito, geo_error, opciones);//funcion que nos permite obtener coordenadas actuales