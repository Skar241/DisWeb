var $form = $('#formulario'),//Gracias a jQuery basta con un $ para obtener los elementos
	$titulo = $('#titulo'),
	$url = $('#url'),
	$button = $('#mostrar-form'),
	$list = $('#contenido'),
	$post = $('.item').first();

function mostrarFormulario(){
	$form.slideToggle();/// a medida que el usauario da click lo va guardando o lo va ocultando
	return false;//para que no recargue la página
}

function agregarPost(){
	var url = $url.val();
	var titulo = $titulo.val();
	var $clone = $post.clone();//clonamos el post

	$clone.find('.titulo_item a')/*buscamos los titulos*/
		.text(titulo)/*remplazamos el texto*/
		.attr('href', url);/*remplazamos la url*/

	$clone.hide();//ocultamos el clone(display none)

	$list.prepend($clone);//Agregamos el elemento modificado al principio

	$clone.fadeIn();//lo colocamos
		
	return false;//cancela el evento
}

//eventos
$button.click(mostrarFormulario)//cuando se de click sobre publicar
$form.on('submit',agregarPost)//cuando se da en submit al formulario