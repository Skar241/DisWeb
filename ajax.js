var base_url = "http://query.yahooapis.com/v1/public/yql?";///obtenemos api yahoo para poder mostrar informacion del clima

function obtenerGeoInformacion(lat, lon) {
	var query = 'SELECT * FROM geo.placefinder WHERE text="'+lat+', '+lon+'" AND gflags="R"';//obtenemos informacion desde el api de yahoo
	query = encodeURIComponent(query);//quitamos los espacios de query

	$.ajax({
		url: base_url+"q="+query,           /*Url completa de donde obtendremos la informacion*/
		dataType : 'jsonp',                 /*indicamos el formateo de los datos resibidos*/
		jsonpCallback: 'procesarGeoInfo',   /*Callback que se ejecuta*/
		data: {
			format: 'json'
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