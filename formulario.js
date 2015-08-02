var $form = $('#formulario'),//Gracias a jQuery basta con un $ para obtener los elementos
	$titulo = $('#titulo'),
	$url = $('#url'),
	$button = $('#mostrar-form'),
	$list = $('#contenido'),
	$post = $('.item').first();

if(localStorage.getItem('autosave')){
	$titulo.val(sessionStorage.getItem('titulo'));
	$url.val(sessionStorage.getItem('titulo'));
}

var id = setInterval(function(){
	sessionStorage.setItem('titulo',$titulo.val());
	sessionStorage.setItem('url',$url.val());
}, 1000);//esta funcion se ejecuta cada segundo

/*
texto = '{"nombre": "oscar", "apellido": "diaz"}'
"{"nombre": "oscar", "apellido": "diaz"}"
obj_texto = JSON.parse(texto)
Object {nombre: "oscar", apellido: "diaz"}
texto = JSON.stringify(obj_texto)
"{"nombre":"oscar","apellido":"diaz"}"
*/

function mostrarFormulario(evento){
	evento.preventDefault();//para que no recargue la página
	$form.slideToggle();/// a medida que el usauario da click lo va guardando o lo va ocultando
	$list.slideToggle();
}

function agregarPost(evento){
	evento.preventDefault();//para que no recargue la página
	var url = $url.val();
	var titulo = $titulo.val();
	var $clone = $post.clone();//clonamos el post


	$clone.find('.titulo_item a')/*buscamos los titulos*/
		.text(titulo)/*remplazamos el texto*/
		.attr('href', url);/*remplazamos la url*/

	$clone.hide();//ocultamos el clone(display none)

	$list.prepend($clone);//Agregamos el elemento modificado al principio

	$clone.fadeIn();//lo colocamos
	mostrarFormulario();
	$titulo.val('');
	$url.val('');
		
	return false;//cancela el evento
}

//eventos
$button.click(mostrarFormulario)//cuando se de click sobre publicar
$form.on('submit',agregarPost)//cuando se da en submit al formulario