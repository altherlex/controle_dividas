addEvent( window, 'load', function (){
	addEvent( $('btnSalvar'), 'click', fn_pesquisar );
});

function fn_pesquisar(){
	document.forms[0].submit();
}
