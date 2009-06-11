/*$(document).ready( function() {
	$('A[rel="external"]').click( function() {
		window.open( $(this).attr('href') );
		return false;
	});
	
	fn_carrega_lst_dividas();
});*/

addEvent( window, 'load', function (){
    fn_carrega_lst_dividas();
});
	
function fn_carrega_lst_dividas() {
	new Ajax.Updater('conteudo_parcelas', '/dividas/carrega_lst_dividas', {
		parameters: { p_ano: '2009', p_cliente_id: $F('hid_cliente_id')  }
	});
};


