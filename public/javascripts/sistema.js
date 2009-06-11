var SIS = {};

SIS.clsGlbSisSistema = function(){};

SIS.clsGlbSisSistema.IncludeJavascript = function(nme_arquivo){
	if(nme_arquivo.indexOf('http') == -1)
		nme_arquivo = '/javascripts/'+nme_arquivo+'.js';

	document.write('<script type="text/javascript" src="'+nme_arquivo.toLowerCase()+'"></script>');
};

SIS.clsGlbSisSistema.Namespace = function(){
	var a = arguments, o = null, d;

	for(var i = 0; i < a.length; i++){
		d = a[i].split(".");

		if( d[0].match(/^[A-Z]+$/) ){
			if( !window[d[0]] )
				window[d[0]] = {};
			o = window[d[0]];
		}else{
			o = window;
		}

		for(var j = (d[0].match(/^[A-Z]+$/))?1:0; j < d.length; j++){
			o[d[j]] = o[d[j]]||{};
			o = o[d[j]];
		}
	}

	return o;
};

SIS.clsGlbSisSistema.CriarCookie = function(nome, valor, qtd_dias_expiracao){
	var vDataExp = new Date();
	vDataExp.setDate( vDataExp.getDate() + qtd_dias_expiracao );
	document.cookie = nome + '=' + escape( valor ) + (( qtd_dias_expiracao == null ) ? '' : ';expires = ' + vDataExp.toGMTString()) + ';path=/';
};

SIS.clsGlbSisSistema.PegarCookie = function(nome){
	if(document.cookie.length > 0){
		var nmr_pos_inicial = document.cookie.indexOf( nome + '=')

		if(nmr_pos_inicial != -1){
			nmr_pos_inicial = nmr_pos_inicial + nome.length + 1;

			var nmr_pos_final = document.cookie.indexOf(';', nmr_pos_inicial);
			if( nmr_pos_final == -1 )
				nmr_pos_final = document.cookie.length;

			return unescape( document.cookie.substring( nmr_pos_inicial, nmr_pos_final ) );
		}
	}

	return ''
};

/*
SIS.clsGlbSisSistema.EscreverIframe = function(iframe, conteudo){
	var doc = iframe.contentDocument;

	if(doc == undefined || doc==null)
		doc = iframe.contentWindow.document;

	doc.open();
	doc.write(conteudo);
	doc.close();
};
*/

SIS.clsGlbSisSistema.KeyCode = function(e){
	return (document.all) ? event.keyCode : e.which;
};

SIS.clsGlbSisSistema.MostrarLightbox = function(id){
	SEG.clsGlbSegSistema.TravarTeclado(true);

	var body = parent.document.getElementsByTagName("body")[0];

	var arrayPageSize = SIS.clsGlbSisSistema.ObterDimensaoPagina();

	var overlay = new parent.Element('div', {'id': 'overlay' + id })
		.addClassName('overlay')
		.setStyle({width: arrayPageSize[0] + 'px', height: arrayPageSize[1] + 'px'});

	body.insertBefore( overlay, body.firstChild );

	try{
		new Effect.Appear( $('overlay' + id),{duration:0.2,from:0.0,to:0.1} );
	}catch(e){
		$('overlay' + id).setStyle({display:'block'});
	}
};

SIS.clsGlbSisSistema.EsconderLightbox = function(id){
	try{
		new Effect.Fade( $('overlay' + id), {duration: 0.2});
	}catch(e){}

	setTimeout("try{parent.document.body.removeChild( $('"+ 'overlay' + id +"') );}catch(e){}", 200);
	SEG.clsGlbSegSistema.TravarTeclado(false);
};

SIS.clsGlbSisSistema.ObterDimensaoPagina = function(){
	var xScroll, yScroll;
	if(window.innerHeight && window.scrollMaxY){
		xScroll = window.innerWidth+window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	}else if(document.body.scrollHeight > document.body.offsetHeight){
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	}else{
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}

	var windowWidth, windowHeight;
	if( self.innerHeight ){
		if( document.documentElement.clientWidth )
			windowWidth = document.documentElement.clientWidth;
		else
			windowWidth = self.innerWidth;

		windowHeight = self.innerHeight;
	}else if( document.documentElement && document.documentElement.clientHeight ){
		windowWidth		= document.documentElement.clientWidth;
		windowHeight	= document.documentElement.clientHeight;
	}else if( document.body ){
		windowWidth		= document.body.clientWidth;
		windowHeight	= document.body.clientHeight;
	}

	var pageHeight, pageWidth;
	pageHeight	= (yScroll < windowHeight) ? windowHeight : yScroll;
	pageWidth		= (xScroll < windowWidth) ? xScroll : windowWidth;

	if(document.documentElement.scrollWidth && document.documentElement.scrollWidth > document.documentElement.clientWidth)
		pageWidth = document.documentElement.scrollWidth;

	if(document.documentElement.scrollHeight && document.documentElement.scrollHeight > document.documentElement.clientHeight)
		pageHeight = document.documentElement.scrollHeight;

	return [pageWidth, pageHeight, windowWidth, windowHeight];
};

SIS.clsGlbSisSistema.ObterScrollPagina = function(){
	return document.viewport.getScrollOffsets();
};

SIS.clsGlbSisSistema.MudarEstilo = function(estilo){
	SIS.clsGlbSisSistema.CriarCookie('sisEstilo', estilo, 365);
	history.go(0);
};

SIS.clsGlbSisSistema.AbaMenuLateral = function( p_estado_atual,p_persistir_cookie ){
	if( !$('menu') ){
		if( $('conteudo_principal') )
			$('conteudo_principal').setStyle({marginLeft:'0px'});
		return;
	}

	var estado_atual = (typeof p_estado_atual == 'undefined') ? $('menu').style.display : p_estado_atual;
	var persistir_cookie = (typeof p_persistir_cookie == 'undefined') ? true : p_persistir_cookie;

	if(persistir_cookie)
		SIS.clsGlbSisSistema.CriarCookie('sisAbaMenuLateral', estado_atual, 20);

	switch(estado_atual){
		case'none':
			$('menu').setStyle({display: ''});
			$('conteudo_principal').setStyle({marginLeft:'185px'});
			break;
		default:
			$('menu').setStyle({display: 'none'});
			$('conteudo_principal').setStyle({marginLeft:'10px'});
	}
};

SIS.clsGlbSisSistema.ConfiguracaoTabela = function(p_obj_tabela, p_configuracao){};

SIS.clsGlbSisSistema.ManterParametrosConsulta = function(){
	var formulario = document.forms[0];
	var arr_params = new Array();

	for(var i = 0; i < formulario.elements.length; i++){
		var elemento	= formulario.elements[i];

		if(elemento.type == 'button' || elemento.getAttribute('cookie') == 'false' || elemento.parentNode.parentNode.style.display == 'none')
			continue;

		try{
			var parametro = elemento.id;
				parametro += "*";
				parametro += SIS.clsGlbSisSistema.verificar_elemento_obrigatorio( elemento ) ? 'S' : 'N';
				parametro += "=";
				parametro += escape( $F(elemento) );
				arr_params.push( parametro );
		}catch(e){}
	}

	var dsc_valor_cookie = arr_params.join("&");
	var nme_cookie = SIS.clsGlbSisSistema.ObterNomeCookieDeParametrosConsulta();
	SIS.clsGlbSisSistema.CriarCookie( nme_cookie, dsc_valor_cookie );
};

SIS.clsGlbSisSistema.verificar_elemento_obrigatorio = function(elemento){
	return ( elemento.getAttribute('visobrig') == 'true' || elemento.getAttribute('obrig') == 'true' );
};

SIS.clsGlbSisSistema.CarregarParametrosConsulta = function(){
	var nme_cookie = SIS.clsGlbSisSistema.ObterNomeCookieDeParametrosConsulta();
	var dsc_params = SIS.clsGlbSisSistema.PegarCookie( nme_cookie );

	if( dsc_params.replace(/ /g,'').length > 0 ){
		var sta_rodar_pesquisa = true;
		arr_campos = dsc_params.split("&");
		for(var i=0;i < arr_campos.length; i++){
			var nme_campo = arr_campos[i].split("=")[0].split("*")[0];
			var str_valor_campo = unescape(arr_campos[i].split("=")[1]);
			var sta_obrig = arr_campos[i].split("=")[0].split("*")[1];
			var obj_campo = $(nme_campo);

			if(obj_campo == null)
				continue;

			if(sta_obrig == 'S' && str_valor_campo == '')
				sta_rodar_pesquisa = false;

			switch(obj_campo.type){
				case"select-one":
					obj_campo.value = str_valor_campo;
					break;
				case"hidden":
					sta_valor_definido = false;
					for(var j=0;j<arr_campos.length;j++){
						var nme_campo_outro = arr_campos[j].split("=")[0].split("*")[0];
						if(nme_campo_outro != obj_campo.id && nme_campo_outro.substr(4) == obj_campo.id.substr(4)){
							obj_campo.value = unescape(arr_campos[j].split("=")[1]);
							sta_valor_definido = true;
							break;
						}
					}

					if(!sta_valor_definido)
						obj_campo.value = str_valor_campo;

					break;
				case"checkbox":
					obj_campo.checked = (str_valor_campo == 'on') ? true : false;
					break;
				default:
					obj_campo.value = str_valor_campo;
			}
		}

		try{
			fnDefinirParametros();
		}catch(e){}
	}
};

SIS.clsGlbSisSistema.ObterValorParametroConsulta = function(nme_campo){
	var nme_cookie	= SIS.clsGlbSisSistema.ObterNomeCookieDeParametrosConsulta();
	var dsc_params	= SIS.clsGlbSisSistema.PegarCookie(nme_cookie);
	var str_retorno = '';

	if( dsc_params.replace(/ /g,'').length > 0 ){
		arr_campos = dsc_params.split("&");
		for(var i=0; i < arr_campos.length; i++){
			var nme_campo_atual = arr_campos[i].split("=")[0].split("*")[0];
			if(nme_campo.toUpperCase() == nme_campo_atual.toUpperCase()){
				str_retorno = unescape(arr_campos[i].split("=")[1]);
				break;
			}
		}
	}
	return str_retorno;
};

SIS.clsGlbSisSistema.ObterNomeCookieDeParametrosConsulta = function(){
	return location.pathname.replace(/\//,"_").replace(/\//,"_");
};

SIS.clsGlbSisSistema.MarcarCamposObrigatorios = function(){
	var elementos = [$$('input[type="text"]'), $$('input[type="password"]'), $$('select'), $$('textarea')].flatten();

	for(var i=0; i < elementos.length; i++){
		var elemento = elementos[i];

		if( !elemento.up('table') || !elemento.up('table').className.include('parametros') || elemento.id.include('CampoCustom') )
			continue;

		var elemento_obrigatorio = SIS.clsGlbSisSistema.verificar_elemento_obrigatorio( elemento );

		if ( div_obrig = ( elemento.up('div.campo_obrig') || elemento.up('div.campo_nao_obrig') ) ){
			div_obrig
				.removeClassName( elemento_obrigatorio ? 'campo_nao_obrig' : 'campo_obrig' )
				.addClassName( elemento_obrigatorio ? 'campo_obrig' : 'campo_nao_obrig' );
		}else{
			var div = new Element('div')
				.addClassName( elemento_obrigatorio ? 'campo_obrig' : 'campo_nao_obrig' );

			var classes = elemento.classNames();

			var nmr_classe_valida = classes.inject(0, function(soma, classe){
				return soma + ( classe.include('txt') ? 1 : 0 );
			});

			if( nmr_classe_valida != 0 ){
				classes.each(function(classe){
					div.addClassName( classe );
					elemento.removeClassName( classe );
				});
				elemento.setStyle({'width': '100%'});
			}else{
				if( elemento.tagName.toUpperCase() == 'INPUT'){
					var width = elemento.getStyle('width') || elemento.getWidth();
					if ( width != 0 ){
						div.setStyle({'width': ( parseInt( width, 10 ) == 0 ) ? '100%' : width });
						if ( Prototype.Browser.Gecko )
							elemento.setStyle({'width': '100%'});
					}
				}
			}

			Element.wrap( elemento, div );
		}
	}
};

SIS.clsGlbSisSistema.Deprecate = function( msg ){
	try{
		console.warn( 'DEPRECATE: ' + msg )
	}catch(e){}
};

var vEstilo = SIS.clsGlbSisSistema.PegarCookie('sisEstilo');
vEstilo = (vEstilo == '') ? 'Padrao' : vEstilo;
document.write("<link href='http://libweb.lbv.org.br/css/"+vEstilo+"/estilo.css' media='screen' rel='Stylesheet' type='text/css' />");

addEvent( window, 'load', function(){
	SIS.clsGlbSisSistema.AbaMenuLateral( SIS.clsGlbSisSistema.PegarCookie('sisAbaMenuLateral') );
	SIS.clsGlbSisSistema.MarcarCamposObrigatorios();

	if( location.pathname.include("Consultar") || location.pathname.include("consultar_") ){
		SIS.clsGlbSisSistema.CarregarParametrosConsulta();

		if( $('aBtnPesquisar') )
			$('aBtnPesquisar').observe( 'click', SIS.clsGlbSisSistema.ManterParametrosConsulta );
	}

	var vStopPagina = new Date();
	var vTempo = vStopPagina.getTime() - vStartPagina.getTime();

	if($('spanTempo'))
		$('spanTempo').innerHTML = "Tempo gasto para carregar a página: " + vTempo + " milésimos";
});