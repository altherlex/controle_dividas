var win = null;
addEvent( window, 'load', function (){

    //myWindow.focus()
    //myWindow.opener.document.write("This is the parent window")
    addEvent( $('btn_adicionar'), 'click', fn_cria_janela);
    
    /*
        ,toolbar=no,location=no,status=no,menubar=no,directories=no
        
        mySon.blur()
        myWindow.opener.document.write("This is the parent window")
        return false;
        
        myWindow=window.open('','MyName','width=780,height=269')
        myWindow.document.write("This is 'myWindow'")
        myWindow.focus()
        myWindow.opener.document.write("This is the parent window")
        
    });*/
    fn_carrega_lst_dividas();
});

function fn_cria_janela(){
    LeftPosition = (screen.width) ? (screen.width-780)/2 : 0;
    TopPosition = (screen.height) ? (screen.height-269)/2 : 0;
    configuracoes = 'resizable=no,width=780,height=269,top='+TopPosition+',left='+LeftPosition,
    mySon = window.open("/dividas/new",'', configuracoes);
//    alert( Object.inspect(mySon) );
    addEvent( mySon, 'onblur', window.close());
//    mySon.$$('body')[0].setAttribute('onblur','window.close()');
}

function fn_carrega_lst_dividas() {
	new Ajax.Updater('conteudo_parcelas', '/dividas/carrega_lst_dividas', {
		parameters: { p_ano: '2009', p_cliente_id: $F('hid_cliente_id'), p_modo_tela: 'EDT'  }
	});
};

function NovaJanela(pagina,nome,w,h,scroll){
	LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
    TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
    settings = 'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'
    win = window.open(pagina,nome,settings);
};