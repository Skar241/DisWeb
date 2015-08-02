var base_url = "http://query.yahooapis.com/v1/public/yql?";///obtenemos api yahoo para poder mostrar informacion del clima

/*para ver el api completo:

	https://developer.yahoo.com/everything.html

*/

//Jsonp json whit padding, lo que le pone al objeto recibido es la llamada
//a una función
//es decir vedra el objeto json envuelto en una funcion

function obtenerGeoInformacion(lat, lon) {
	var query = 'SELECT * FROM geo.placefinder WHERE text="'+lat+', '+lon+'" AND gflags="R"';//obtenemos informacion desde el api de yahoo
	query = encodeURIComponent(query);//quitamos los espacios de query

	$.ajax({//esto hace la peticion Ajax, gracias a jQuery
		url: base_url+"q="+query,           /*Url completa de donde obtendremos la informacion*/
		dataType : 'jsonp',                 /*indicamos el formato*/
		jsonpCallback: 'procesarGeoInfo',   /*Callback que se ejecuta*/
		data: {								/*todos los objetos json serán agregados a la url*/
			format: 'json'					/*se lo mandamos a yahoo y nos devolvera un json*/
		}
	});
}

function procesarGeoInfo(datos) {
	var res    = datos.query.results.Result;
	var barrio = res.neighborhood;
	var ciudad = res.city;
	var pais   = res.country;
	var woeid  = res.woeid;

	$('#geo')
		.prepend('<p><strong>'+barrio+'</strong><br>'+ciudad+', '+pais+'</p>');  //lo agregamos a la pagina

	obtenerClima(woeid);
}

function obtenerClima(woeid) {
	var query = 'SELECT * FROM weather.forecast WHERE woeid="'+woeid+'" and u="c"';
	query = encodeURIComponent(query);

	$.ajax({
		url: base_url+"q="+query,
		dataType : 'jsonp',
		jsonpCallback: 'procesarClima',
		data: {
			format: 'json'
		}
	});
}

function procesarClima(datos) {
	var clima = datos.query.results.channel;
	var temp  = clima.item.condition.temp;
	var unit  = clima.units.temperature;
	var code  = clima.item.condition.code;
	var img   = new Image();
	img.src   = "http://l.yimg.com/a/i/us/we/52/"+code+".gif"

	console.log(clima);

	$('#clima')
		.append(img)
		.append(temp+' '+unit+'º');

}