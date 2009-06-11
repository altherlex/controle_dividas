if(typeof HTML == 'undefined')
	HTML = {};

HTML.clsGlbUsrAba = Class.create({
	initialize: function(){
		this._grupos = new Array();
		this._nme_grupo_padrao = null;
	},

	//Métodos públicos
	DefinirGrupoPadrao : function( p_nme_grupo_padrao ){
		this._nme_grupo_padrao = p_nme_grupo_padrao;
		this.CarregarGrupo( this._nme_grupo_padrao );
	},

	AdicionarGrupo : function( p_nme_grupo ){
		this._grupos.push( p_nme_grupo );
	},

	CarregarGrupo : function( p_nme_grupo ){
		for(i = 0; i < this._grupos.length; i++){
			var grupo = this._grupos[i];
			if ( grupo == p_nme_grupo ){
				$(grupo).setStyle({display : '' });
				$(grupo + '_tab').className = 'selected';
			} else {
				$(grupo).setStyle({display : 'none' });
				$(grupo + '_tab').className = '';
			}
		}
	}
});

HTML.clsGlbUsrCombobox = Class.create({
	initialize : function( combobox, lista, valor_padrao ){
		this._combobox 					= combobox;
		this._itens							= lista;
		this._nme_coluna_item 	= new String();
		this._nme_coluna_valor	= new String();
		this._atributos 				= new Array();
		this._posicao_limpar 		= 1;
		this._option_branco 		= false;
		this._valor_selecionado = valor_padrao;

		return this;
	},

	definir_option_branco : function( p_option_branco ){
		this._option_branco = p_option_branco;
	},

	definir_posicao_limpar : function( p_posicao_limpar ){
		this._posicao_limpar = p_posicao_limpar;
	},

	DefinirLstItens : function( itens ){
		this._itens = itens;
	},

	DefinirColunas : function( p_nme_coluna_valor, p_nme_coluna_item ){
		this._nme_coluna_valor = p_nme_coluna_valor;
		this._nme_coluna_item	= p_nme_coluna_item;
	},

	DefinirAttributo : function( p_atributos ){
		this._atributos.push( p_atributos );
	},

	// DEPRECATE: use definir_posicao_limpar
	DefinirNmrPosicaoLimpar : function( p_posicao_limpar ){
		this.definir_posicao_limpar( p_posicao_limpar );
	},

	// DEPRECATE: use definir_option_branco
	DefinirOptionBranco : function( p_option_branco ){
		this.definir_option_branco( p_option_branco );
	},

	DefinirValorSelecionado : function( p_valor_selecionado ){
		this._valor_selecionado = p_valor_selecionado;
	},

	CarregarCombobox : function(){
		for (var i = this._combobox.options.length-1; i >= this._posicao_limpar; i--)
			this._combobox.options[i] = null;

		if( this._option_branco )
			this._combobox.appendChild( new Element('option', {value: ''}).update('') );

		// Deprecate -------------------------------------------------------------------
		if ( this._nme_coluna_valor != '' ){

			for(var i = 0; i < this._itens.length; i++){
				var option = new Element('option', {value: eval( 'this._itens[i].attributes.'+ this._nme_coluna_valor )})
					.update( eval( 'this._itens[i].attributes.'+ this._nme_coluna_item ) );

				for(var x=0; x < this._atributos.length; x++)
					option.setAttribute( this._atributos[x], eval( 'this._itens[i].attributes.'+ this._atributos[x] ) );

				if ( String(this._valor_selecionado) == String(option.value) )
					option.setAttribute( "selected", "selected" );

				this._combobox.appendChild( option );
			}

		}else{
		// ------------------------------------------------------------------------------

			for(var i = 0; i < this._itens.length; i++){

				var option = new Element('option', { value: this._itens[i].valor })
					.update( this._itens[i].descricao );

				if( this._itens[i].outros_atributos ){

					this._itens[i].outros_atributos.split('&').each(function(atributo){
						var nome_atributo 	= atributo.split('=')[0];
						var valor_atributo 	= atributo.split('=')[1];

						option.setAttribute( nome_atributo, valor_atributo );
					});
				}

				if ( String(this._valor_selecionado) == String(option.value) )
					option.setAttribute( "selected", "selected" );

				this._combobox.appendChild( option );
			}

		}

		HTML.clsGlbUsrFormulario.SimularEvento( this._combobox.id, 'change' );
	}
});

HTML.clsGlbUsrComboboxDif = Class.create({
	initialize : function(){
		this._nme_combobox = new String();
		this._dsc_combobox = new String();
		this._itens = new Array();
		this._largura = new Number();
	},

	DefinirNmeObjCombobox : function( p_nme_combobox ){
		this._nme_combobox = p_nme_combobox;
	},

	DefinirDescricao : function ( p_dsc_combobox ){
		this._dsc_combobox = p_dsc_combobox;
	},

	AdicionarItem : function( p_item ){
		this._itens.push( p_item );
	},

	DefinirLargura : function( p_largura ){
		this._largura = p_largura;
	},

	GerarCombobox : function(){
		this._criar_combobox();
		this._criar_itens();
	},

	_criar_combobox : function(){
		var div = new Element('div', { 'class': 'img_combobox', id: 'aCbBoxCriacao'});
		var p	= new Element('p').update(this._dsc_combobox);
		div.appendChild( p );

		$(this._nme_combobox).appendChild( div );
	},

	_criar_itens : function(){
		var div = new Element('div', { 'class': 'combobox_options_esconder', id: 'aCbBoxCriacao_options'});
		div.setStyle({width : this._largura + 'px'});

		var ul = new Element('ul');

		for( var i=0; i < this._itens.length; i++ ){
			var li = new Element('li');
			var link = new Element('a', { href: this._itens[i][1] }).update( this._itens[i][0] );
			li.appendChild( link );
			ul.appendChild( li );
		}

		div.appendChild( ul );
		$(this._nme_combobox).appendChild( div );

		$(this._nme_combobox).observe( 'mouseover', function() {
			div.className = 'combobox_options';
		});

		$(this._nme_combobox).observe( 'mouseout', function(){
			div.className = 'combobox_options_esconder';
		});
	}
});

HTML.clsGlbUsrSelecaoLista = Class.create({
	initialize : function( p_lista_origem, p_lista_destino){
		this._lista_origem = p_lista_origem;
		this._lista_destino = p_lista_destino;
	},

	InserirItens : function (){
		for(var i = 0; i < this._lista_origem.length; i++)
			if( this._lista_origem.options[i].selected ){
				this._lista_destino.options[this._lista_destino.length] = new Option(this._lista_origem.options[i].text, this._lista_origem.options[i].value, '');
				this._lista_origem.options[i] = null;
				i--;
			}
	},

	InserirTodosItens : function (){
		for(var i = 0; i < this._lista_origem.length; i++){
			this._lista_destino.options[this._lista_destino.length] = new Option(this._lista_origem.options[i].text, this._lista_origem.options[i].value, '');
			this._lista_origem.options[i] = null;
			i--;
		}
	},

	RemoverItens : function(){
		for( var i=0; i < this._lista_destino.length; i++)
			if( this._lista_destino.options[i].selected ){
				this._lista_origem.options[this._lista_origem.length] = new Option(this._lista_destino.options[i].text, this._lista_destino.options[i].value, '');
				this._lista_destino.options[i] = null;
				i--;
			}
	},

	RemoverTodosItens : function(){
		for( var i = 0; i < this._lista_destino.length; i++){
			this._lista_origem.options[this._lista_origem.length] = new Option(this._lista_destino.options[i].text, this._lista_destino.options[i].value, '');
			this._lista_destino.options[i] = null;
			i--;
		}
	}
});

HTML.clsGlbUsrSelecaoData = Class.create({
	initialize : function( p_data, p_lista_destino ){
		this._data = p_data;
		this._lista_destino = p_lista_destino;
	},

	InserirItens : function (){
		if( HTML.clsGlbUsrValidacao.ValidarCampoData( this._data ) ){
			var data_ja_informada = false;
			for( var i = 0; i < this._lista_destino.length; i++)
				if( this._lista_destino.options[i].value == this._data.value ){
					data_ja_informada = true;
					break;
				}

			if( !data_ja_informada )
				this._lista_destino.options[this._lista_destino.length] = new Option(this._data.value, this._data.value, '');
		}
	},

	RemoverItens : function(){
		for( var i=0; i < this._lista_destino.length; i++){
			if( this._lista_destino.options[i].selected ){
				this._lista_destino.options[i] = null;
				i--;
			}
		}
	}
});

// DEPRECATE
HTML.clsGlbUsrLista = Class.create({
	initialize : function(){
		this.aObjLista = null;
		this._itens = null;
		this.aObjValorCodigo;
		this.aObjValorDescricao;
		this.aNmeColunaCodigo;
		this.aNmeColunaDescricao;
		this.aArrOutrasColunas  = new Array();
		this.aFnEventoClick;
	},

	DefinirColunaCodigo : function( pNmeColunaCodigo ){
		this.aNmeColunaCodigo = pNmeColunaCodigo;
	},

	DefinirColunaDescricao : function( pNmeColunaDescricao ){
		this.aNmeColunaDescricao = pNmeColunaDescricao;
	},

	DefinirOutrasColunas : function( pArrOutrasColunas ){
		this.aArrOutrasColunas = pArrOutrasColunas;
	},

	DefinirObjetosHTML : function( pObjValorCodigo, pObjValorDescricao ){
		this.aObjValorCodigo    = pObjValorCodigo;
		this.aObjValorDescricao = pObjValorDescricao;
	},

	DefinirFuncaoAposSelecao : function( pEventoClick ){
		this.aFnEventoClick = pEventoClick;
	},

	DeletarLista : function(){
		if ( this.aObjLista != null )
			parent.document.body.removeChild( this.aObjLista );
	},

	CriarLista : function ( pRetorno, pLargura, pMsgErro ){
		this._itens = pRetorno;
		fnDeletarLista();

		//--- Se não retornar nenhum registro, mostrará a mensagem e sairá.
		if ( this._itens.length == 0 ) {
			this.aObjValorCodigo.value = '';
			parent.HTML.clsGlbUsrInteratividade.CriarCaixaDialogo( pMsgErro );
			try{
				this.aObjValorDescricao.select();
				this.aObjValorDescricao.focus();
			}catch(e){}
			return;
		}

		//-- Adiciona um evento para quando a descrição for alterada, o campo hidden seja limpo.
		try{
			var pointer = this.aObjValorCodigo;
			addEvent( $(this.aObjValorDescricao), 'change', function(){ $(pointer).value = ''; });
		}catch(e){}

		//--- Se retornar aprenas um registro, a função joga os valores diretamente nos objetos html.
		if ( this._itens.length == 1 ) {
			this.aObjValorCodigo.value    = this._manter_compatibilidade_valor( 0 );
			this.aObjValorDescricao.value = this._manter_compatibilidade_descricao( 0 );
			if ( typeof this.aFnEventoClick != 'undefined' )
				eval( this.aFnEventoClick );
			return;
		}

		this.aObjLista = new parent.Element('div', {id: 'div_lista', name: 'div_lista'});

		var offsetTrail = this.aObjValorDescricao;
		var offsetLeft  = 0;
		var offsetTop   = 0;

		while ( offsetTrail ){
			offsetLeft += parseInt( offsetTrail.offsetLeft, 10);
			offsetTop  += parseInt( offsetTrail.offsetTop, 10);
			offsetTrail = offsetTrail.offsetParent;
		}

		//--- Ajusta a posição no browser Safari.
		if ( navigator.userAgent.indexOf("Mac") != -1 && typeof document.body.leftMargin != "undefined" ){
			offsetLeft += document.body.leftMargin;
			offsetTop  += document.body.topMargin;
		}

		//--- Se a lista for chamada de um popup, as posições top e left do popup
		//--- são acrescentadas nas respectivas posições da lista.
		if ( parent.$('FormPopUp') != null ){
			this.aObjLista.setStyle({zIndex: 100});

			offsetTop  += parseInt( parent.$('FormPopUp').offsetTop, 10);
			offsetLeft += parseInt( parent.$('FormPopUp').offsetLeft, 10);

			if( Prototype.Browser.IE ){
				offsetTop  += 6;
				offsetLeft += 6;
			}
		}

		this.aObjLista.setStyle({
			height: ( 17 * this._itens.length > 100 ? 100 : 17 * this._itens.length ) + 'px',
			width: pLargura + 25 + 'px',
			top: offsetTop + 18 + 'px',
			left: offsetLeft + 'px'
		});

		var vObjHtmlUL = new parent.Element('ul');

		for( var i=0; i<this._itens.length; i++ ){
			var vObjHtmlLI   = new parent.Element('li');
			var vObjHtmlLink = new parent.Element('a');

			var vObjHmltDivDesc = new parent.Element("div");
			vObjHmltDivDesc.appendChild( parent.document.createTextNode( this._manter_compatibilidade_descricao( i ) ) );

			vObjHmltDivDesc.style.width = ( this.aArrOutrasColunas.length == 0 ) ? '100%' : '70%';

			vObjHtmlLink.appendChild( vObjHmltDivDesc );

			for( var j=0; j < this.aArrOutrasColunas.length; j++ ){
				var vObjHtmlDivOutrasCol = parent.document.createElement("DIV");
				vObjHtmlDivOutrasCol.appendChild( parent.document.createTextNode( eval( 'pRetorno[i].attributes.'+ this.aArrOutrasColunas[j] ) ) );
				vObjHtmlLink.appendChild( vObjHtmlDivOutrasCol );
			}

			vObjHtmlLink.objPai    = this;
			vObjHtmlLink.href      = "javascript:void(0);";
			vObjHtmlLink.Codigo    = this._manter_compatibilidade_valor( i );
			vObjHtmlLink.Descricao = this._manter_compatibilidade_descricao( i );
			vObjHtmlLink.title     = vObjHtmlLink.Descricao;

			vObjHtmlLink.onclick = function() {
				this.objPai.aObjValorCodigo.value    = this.Codigo;
				this.objPai.aObjValorDescricao.value = this.Descricao;

				if ( typeof this.objPai.aFnEventoClick != 'undefined' )
					eval( this.objPai.aFnEventoClick );

				this.objPai.DeletarLista();
			}

			addEvent( document, 'click', fnDeletarLista );

			vObjHtmlLI.appendChild( vObjHtmlLink );
			vObjHtmlUL.appendChild( vObjHtmlLI );
		}

		this.aObjLista.appendChild( vObjHtmlUL );
		parent.document.body.appendChild( this.aObjLista );
	},

	_manter_compatibilidade_valor : function( indice ){
		if( !Object.isUndefined( this.aNmeColunaCodigo ) )
			return eval( "this._itens["+ indice +"].attributes." + this.aNmeColunaCodigo )
		else
			return this._itens[indice].valor;
	},

	_manter_compatibilidade_descricao : function( indice ){
		if( !Object.isUndefined( this.aNmeColunaCodigo ) )
			return eval( "this._itens["+ indice +"].attributes." + this.aNmeColunaDescricao )
		else
			return this._itens[indice].descricao;
	}
});

function fnDeletarLista(){
	while ( parent.$('div_lista') )
		parent.document.body.removeChild( parent.$('div_lista') );

	removeEvent( document, 'click', fnDeletarLista );
};

HTML.AutoSugestao = Class.create({
	initialize : function( campo, campo_valor, params ){
		this.campo_descricao	= campo;
		this.campo_valor			= campo_valor;

		this._input 				= '';
		this.nInputChars 		= 0;
		this.aSuggestions 	= [];
		this.iHighlighted 	= 0;

		// parameters object
		this._params = ( params ) ? params : {};

		// Defaults
		if (!this._params.minchars)
			this._params.minchars = 3;

		if (!this._params.className)
			this._params.className = "autosuggest";

		if (!this._params.timeout)
			this._params.timeout = 25000;

		if (!this._params.delay)
			this._params.delay = 500;

		if (!this._params.offsety)
			this._params.offsety = -5;

		if (!this._params.shownoresults)
			this._params.shownoresults = true;

		if (!this._params.noresults)
			this._params.noresults = "Sem resultado!";

		//if (!this._params.maxheight && this._params.maxheight !== 0)
		//	this._params.maxheight = 250;

		if (!this._params.cache && this._params.cache != false)
			this._params.cache = true;

		// set keyup handler for field
		// and prevent autocomplete from client

		var pointer = this;

		this.campo_descricao.observe('keypress', function(ev){
			return pointer.onKeyPress(ev);
		});

		this.campo_descricao.observe('keyup', function(ev){
			return pointer.onKeyUp(ev);
		});

		this.campo_descricao.observe('change', function(){ campo_valor.value = ''; });

		this.campo_descricao.setAttribute("autocomplete", "off");

		return this;
	},

	onKeyPress : function(ev){
		var key = (window.event) ? window.event.keyCode : ev.keyCode;

		// set responses to keydown events in the field
		// this allows the user to use the arrow keys to scroll through the results
		// ESCAPE clears the list
		// TAB sets the current highlighted value

		var RETURN = 13;
		var TAB = 9;
		var ESC = 27;

		var bubble = true;

		switch(key)	{

			case RETURN:
				this.setHighlightedValue();
				bubble = false;
				break;

			case ESC:
				this.clearSuggestions();
				break;
		}

		return bubble;
	},

	onKeyUp : function(ev){
		var key = (window.event) ? window.event.keyCode : ev.keyCode;

		// set responses to keydown events in the field
		// this allows the user to use the arrow keys to scroll through the results
		// ESCAPE clears the list
		// TAB sets the current highlighted value

		var ARRUP = 38;
		var ARRDN = 40;

		var bubble = true;

		switch(key){

			case ARRUP:
				this.changeHighlight(key);
				bubble = false;
				break;

			case ARRDN:
				this.changeHighlight(key);
				bubble = false;
				break;

			default:
				this.getSuggestions(this.campo_descricao.value);
		}

		return bubble;
	},

	getSuggestions : function (val){
		// if input stays the same, do nothing
		if (val == this._input)
			return false;

		// input length is less than the min required to trigger a request
		// reset input string
		// do nothing
		if (val.length < this._params.minchars){
			this._input = '';
			return false;
		}

		// if caching enabled, and user is typing (ie. length of input is increasing)
		// filter results out of aSuggestions from last request

		if (val.length > this.nInputChars && this.aSuggestions.length && this._params.cache){
			var arr = [];
			for (var i=0; i < this.aSuggestions.length; i++)
				if ( this.aSuggestions[i].value.substr(0,val.length).toLowerCase() == val.toLowerCase() )
					arr.push( this.aSuggestions[i] );

			this._input 			= val;
			this.nInputChars 	= val.length;
			this.aSuggestions = arr;

			this._criar_lista(this.aSuggestions);

			return false;
		}else{
			// do new request

			this._input = val;
			this.nInputChars = val.length;

			var pointer = this;
			clearTimeout( this.ajID );
			this.ajID = setTimeout( function(){ pointer.doAjaxRequest() }, this._params.delay );
		}

		return false;
	},

	doAjaxRequest : function (){
		var pointer = this;

		var p = this._params.parametros.gsub(/\#{(.*?)\}/, function(match){
			return $F( match[1] )
		}).gsub('varname', escape( this.campo_descricao.value ) );

		requestAjax( this._params.script, p,
			function (req) {
				pointer.setSuggestions(req)
			}
		);
	},

	setSuggestions : function (req){
		this.aSuggestions = [];

		var jsondata = req.responseText.evalJSON(true);

		for (var i=0; i < jsondata.length; i++){
			 var info = Object.isUndefined( jsondata[i].outros_atributos ) ? '' :
			 	jsondata[i].outros_atributos.split('&').map(function(valor){ return valor.split('=')[1]; }).join(', ');

			this.aSuggestions.push( { 'id': jsondata[i].valor, 'value': jsondata[i].descricao, 'info': info } );
		}

		this.idAs = "as_" + this.campo_descricao.id;

		this._criar_lista( this.aSuggestions );
	},

	_criar_lista : function(arr){
		var pointer = this;

		// get rid of old list
		// and clear the list removal timeout
		if( $(this.idAs) )
			$(this.idAs).remove();

		this.killTimeout();

		// create holding div
		var div = new Element("div", {id: this.idAs, 'class': this._params.className});

		var hcorner = new Element("div", {'class': "as_corner"});
		var hbar 		= new Element("div", {'class': "as_bar"});
		var header	= new Element("div", {'class': "as_header"});

		header.appendChild(hcorner);
		header.appendChild(hbar);
		div.appendChild(header);

		// create and populate ul
		var ul = new Element("ul", {id: "as_ul"});

		// loop throught arr of suggestions
		// creating an LI element for each suggestion
		var limite = arr.length < parseInt( this._params.maxresults, 10) ? arr.length : parseInt( this._params.maxresults, 10);
		for (var i=0; i < limite; i++){
			// format output with the input enclosed in a EM element (as HTML, not DOM)
			var val = arr[i].value;
			var st = val.toLowerCase().indexOf( this._input.toLowerCase() );
			var output = val.substring(0,st) + "<em>" + val.substring(st, st + this._input.length) + "</em>" + val.substring(st+this._input.length);

			var span = new Element("span").update( output );

			if ( arr[i].info != '' ){
				span.appendChild( new Element("br") );
				span.appendChild( new Element("small").update( arr[i].info ) );
			}

			var a		= new Element("a", { href: "#" });
			var tl	= new Element("span", {'class': "tl"}).update( ' ' );
			var tr	= new Element("span", {'class': "tr"}).update( ' ' );

			a.appendChild( tl );
			a.appendChild( tr );
			a.appendChild( span );

			a.name = i + 1;
			a.observe('click', function() {
				pointer.setHighlightedValue();
				return false;
			});

			a.observe('mouseover', function(){
				pointer.setHighlight(this.name);
			});

			var li = new Element( "li" ).update( a );

			ul.appendChild( li );
		}

		// no results
		if ( arr.length == 0 ){
			var li = new Element( "li", {'class': "as_warning"}).update( this._params.noresults );
			ul.appendChild( li );
		}

		div.appendChild( ul );

		var fcorner = new Element("div", {'class':"as_corner"});
		var fbar 		= new Element("div", {'class':"as_bar"});
		var footer 	= new Element("div", {'class':"as_footer"});
		footer.appendChild(fcorner);
		footer.appendChild(fbar);
		div.appendChild(footer);

		// get position of target textfield
		// position holding div below it
		// set width of holding div to width of field
		var pos = this.campo_descricao.positionedOffset();

		// Se a lista for chamada de um popup, as posições top e left do popup
		// são acrescentadas nas respectivas posições da lista.
		if ( parent.$('FormPopUp') != null ){
			div.setStyle({zIndex: 100});

			pos.top  += parseInt( parent.$('FormPopUp').offsetTop, 10);
			pos.left += parseInt( parent.$('FormPopUp').offsetLeft, 10);
		}

		div.setStyle({
			left: pos.left + "px",
			top: ( pos.top + this.campo_descricao.offsetHeight + this._params.offsety ) + "px",
			width: this.campo_descricao.offsetWidth + "px" });

		// set mouseover functions for div
		// when mouse pointer leaves div, set a timeout to remove the list after an interval
		// when mouse enters div, kill the timeout so the list won't be removed
		div.observe('mouseover', function(){
			pointer.killTimeout()
		});

		div.observe( 'mouseout', function(){
			pointer.resetTimeout()
		});

		// add DIV to document
		document.getElementsByTagName("body")[0].appendChild( div );

		// currently no item is highlighted
		this.iHighlighted = 0;

		// remove list after an interval
		var pointer = this;
		this.toID = setTimeout(function(){ pointer.clearSuggestions() }, this._params.timeout);
	},

	changeHighlight : function(key){
		var list = $("as_ul");

		if (!list)
			return false;

		var n;
		if (key == 40)
			n = this.iHighlighted + 1;
		else if (key == 38)
			n = this.iHighlighted - 1;

		if (n > list.childNodes.length)
			n = list.childNodes.length;
		if (n < 1)
			n = 1;

		this.setHighlight(n);
	},

	setHighlight : function(n){
		var list = $("as_ul");

		if (!list)
			return false;

		if (this.iHighlighted > 0)
			this.clearHighlight();

		this.iHighlighted = Number(n);

		list.childNodes[this.iHighlighted-1].className = "as_highlight";

		this.killTimeout();
	},

	clearHighlight : function(){
		var list = $("as_ul");

		if (!list)
			return false;

		if (this.iHighlighted > 0){
			list.childNodes[this.iHighlighted-1].className = "";
			this.iHighlighted = 0;
		}
	},

	setHighlightedValue : function (){
		if (this.iHighlighted){
			this._input = this.campo_descricao.value = this.aSuggestions[ this.iHighlighted-1 ].value;
			this.campo_valor.value = this.aSuggestions[ this.iHighlighted-1 ].id;

			// move cursor to end of input (safari)
			this.campo_descricao.focus();
			if (this.campo_descricao.selectionStart)
				this.campo_descricao.setSelectionRange(this._input.length, this._input.length);

			this.clearSuggestions();

			// pass selected object to callback function, if exists
			if ( Object.isFunction(this._params.callback) )
				this._params.callback( this.aSuggestions[this.iHighlighted-1] );
		}
	},

	killTimeout : function(){
		clearTimeout(this.toID);
	},

	resetTimeout : function(){
		clearTimeout(this.toID);
		var pointer = this;
		this.toID = setTimeout(function () { pointer.clearSuggestions() }, 1000);
	},

	clearSuggestions : function (){
		this.killTimeout();

		var ele = $(this.idAs);
		var pointer = this;
		if (ele)
			var fade = Effect.Fade( ele, { duration: 0.25, from: 1, to: 0 });
	}
});

HTML.clsGlbUsrImagem = Class.create({
	initialize : function(){
		this._largura = new Number();
		this._altura	= new Number();
	},

	DefinirResolucaoMaxima : function ( p_largura, p_altura ){
		this._largura = p_largura;
		this._altura  = p_altura;
	},

	ValidarCaminhoArquivo : function( p_obj_input_file ){
		var imagem = new Image();
		imagem.src = p_obj_input_file.value;

		if ( ( p_obj_input_file.value != '' ) && ( ( p_obj_input_file.value.search(/.jpg/i) < 0 && p_obj_input_file.value.search(/.gif/i) < 0 ) || imagem.src.indexOf('file') < 0 ) ) {
			parent.HTML.clsGlbUsrInteratividade.CriarCaixaDialogo('Imagem inválida.');
			return false;
		}else{
			return true;
		}
	},

	CarregarImagem : function( p_imagem, p_obj_hid_imagem, p_obj_input_file ){
		var imagem = new Image();
		imagem.src = p_obj_input_file.value;

		if ( this.ValidarCaminhoArquivo( p_obj_input_file ) && p_obj_input_file.value != '' ){

			imagem.height = 0;
			imagem.width 	= 0;

			while ( ( parseInt(imagem.height, 10) > parseInt(this._altura, 10) ) || ( parseInt(imagem.width, 10) > parseInt(this._largura, 10) ) ){
				imagem.height = imagem.height*0.95;
				imagem.width  = imagem.width*0.95;
			}

			p_imagem.setStyle({display : ''});
			p_obj_hid_imagem.value = imagem.src;

			if ( imagem.height > 0 )
				p_imagem.height = imagem.height;

			if ( imagem.width  > 0 )
				p_imagem.width  = imagem.width;

			p_imagem.src = imagem.src;
			delete imagem;
		}
	}
});

//--------------------------------------- Pop-up ----------------------------------------
HTML.clsGlbUsrPopUp = Class.create();

Object.extend( HTML.clsGlbUsrPopUp, {
	AbrirFormulario : function( p_url, p_altura, p_largura, p_tpo_pop_up ){
		var tpo_pop_up = ( typeof p_tpo_pop_up == 'undefined' ) ? false : true;

		if ( !tpo_pop_up ){
			if ( !parent.$('FormPopUp') ){
				parent.HTML.clsGlbUsrInteratividade.CriarCarregando('mostrar');
				parent.SIS.clsGlbSisSistema.MostrarLightbox('_pf');

				var arrDimensaoPagina = parent.SIS.clsGlbSisSistema.ObterDimensaoPagina();
				var arrDimensaoScroll = parent.SIS.clsGlbSisSistema.ObterScrollPagina();

				var iframe = new Element('iframe', {id: 'FormPopUp', src: p_url, scrolling: 'no', frameborder: 0, vspace: 0, hspace: 0 })
					.setStyle({
						display: 'none',
						height: p_altura + "px",
						width: p_largura + "px",
						top: ( ( arrDimensaoPagina[3] - p_altura  ) / 2 ) + arrDimensaoScroll[1] + 'px',
						left: ( ( arrDimensaoPagina[2] - p_largura ) / 2 ) + arrDimensaoScroll[0] + 'px'});

				document.body.appendChild( iframe );

				Event.observe( $('FormPopUp'), 'load', function(){
					if( $('FormPopUp') == null ) return false;

					parent.HTML.clsGlbUsrInteratividade.CriarCarregando('esconder');

					try{
						new Effect.Appear($('FormPopUp'), { duration: 0.2, from: 0.0, to: 1 });
					}catch(e){
						$('FormPopUp').setStyle({display: ''});
					}

					setTimeout( HTML.clsGlbUsrPopUp.FocarPrimeiroElemento.bind(this), 1000 );
				});
			}

		} else {
			window.open(p_url, '', 'width='+ p_largura +',height='+ p_altura + ',scrollbars=no,status=no,location=no,toolbar=no,menubar=no' );
		}
	},

	// ***************************************************
	//  FOCA O PRIMEIRO ELEMENTO DA POPUP
	//  elaborado para corrigir erros de focus no IE
	// ***************************************************
	FocarPrimeiroElemento : function(){
		if ($('FormPopUp') == null)	return;

		var documento = $('FormPopUp').contentDocument;
		if (documento == undefined || documento == null)
			documento = $('FormPopUp').contentWindow.document;

		var e = document.forms[0].elements;
		for( var i=0; i < e.length; i++)
			if( e[i].type != 'hidden' && e[i].type != 'button' ){
				e[i].focus();
				break;
			}
	},

	FecharFormulario : function(){
		try{
			parent.SIS.clsGlbSisSistema.EsconderLightbox('_pf');
		}catch(e){};

		// Remove todas as listas que estiverem abertas.
		try{
			while( parent.$('div_lista') )
				parent.document.body.removeChild( parent.$('div_lista') );
		}catch(e){};

		// Remove o popup
		// Devido a incompatibilidades, primeiramente o pop-up é escolhido para depois ser removido.
		parent.$('FormPopUp').hide();
		setTimeout("parent.$('FormPopUp').remove();", 300);
		//----------------------------------------------------------------------------------

		// Código necessário para consertar um bug que ocorria quando se fechava o formulário e os campos do formulário pai ficavam travados.
		try{ window.focus(); }catch(e){};
	}
});

HTML.clsGlbUsrPaginacao = Class.create({
	initialize : function(p_nme_obj_paginacao, p_obj_tabela ){
		this._id = HTML.clsGlbUsrPaginacao.ultimo_id++;

		this._tabela = p_obj_tabela;

		// Variável que guarda a quantidade total de resitros da tabela.
		// ATENÇÃO: a quantidade de registros é decrementada, pois o componente lista_dados cria uma linha vazia para poder funcionar.
		this._qtd_registros = p_obj_tabela.getElementsByTagName('TBODY')[0].rows.length -1;

		// Variável que guarda o número de páginas que estaram visíveis para a navegação,
		// caso o número total de páginas ultrapasse esse número, é criado os botões <<, < ou >, >>.
		this._nmr_pag_grupo = 5;

		// Variável que aponta a primeira página que será exibida.
		this._nmr_pag_grupo_ini = 1;

		// Variável que define as opções possíveis...
		this._qtd_registro_pagina_escolha = [5, 10, 20, 30, 50, 100];

		var qtd_pag_cookie = parseInt( SIS.clsGlbSisSistema.PegarCookie( 'sisQtdRegPag' ), 10);

		// Variável que aponta quantos registros serão apresentados por página. Default: 10
		this._qtd_registro_pagina = ( !isNaN( qtd_pag_cookie ) ) ? qtd_pag_cookie : this._qtd_registro_pagina_escolha[1];

		this._nmr_pagina_atual = 0;

		// Variável que guarda a quantidade de páginas criadas.
		this._qtd_paginas = 0;

		return this;
	},

	DefinirPaginaAtual : function ( p_nmr_pag_atual ){
		this.CalcularNmrGrupoPaginaInicial( p_nmr_pag_atual );
		this._nmr_pagina_atual = p_nmr_pag_atual;
		this.CarregarPagina( this._nmr_pagina_atual );
	},

	CalcularNmrGrupoPaginaInicial : function( p_nmr_pag_atual ){
		this._nmr_pag_grupo_ini = Math.floor( p_nmr_pag_atual / this._nmr_pag_grupo ) - 1;

		if ( ( p_nmr_pag_atual % this._nmr_pag_grupo ) > 0  )
			this._nmr_pag_grupo_ini++;

		this._nmr_pag_grupo_ini = ( this._nmr_pag_grupo_ini * this._nmr_pag_grupo ) + 1;
	},

	CalcularQtdPagina : function(){
		this._qtd_paginas = Math.floor( this._qtd_registros / this._qtd_registro_pagina );
		if ( ( this._qtd_registros % this._qtd_registro_pagina ) > 0  ) this._qtd_paginas++;
	},

	CriarNavegacao : function(){
		this.CalcularQtdPagina();

		if ( this._nmr_pag_grupo_ini == 0) this._nmr_pag_grupo_ini = 1;

		var navegacao = new Element('div', {'id': 'paginacao_navegacao', 'class': 'paginacao'});

		var span = new Element('span', {'class': 'paginacaoDisplay'});

		var select = new Element('select', {id: this._obter_nome_combobox_reg_pag()})
			.observe('change', this.AlterarQtdRegistroPagina.bind(this) );

		for( var i = 0; i < this._qtd_registro_pagina_escolha.length; i++ ){
			var opcao = new Element('option', {value: this._qtd_registro_pagina_escolha[i],
				selected: this._qtd_registro_pagina_escolha[i] == this._qtd_registro_pagina })
				.update( this._qtd_registro_pagina_escolha[i] + ' resultados por página' );
			select.appendChild(opcao);
		}

		span.update('Mostrar ').appendChild( select );

		navegacao.appendChild( span );

		var span = new Element('span', {'class': 'paginacaoPaginas'});

		var input_primeiro = new Element('input', {type: 'button', 'class': 'botao', value: '<<', title: 'Primeira página'})
			.observe('click', this.PrimeiraPagina.bind(this) );

		var input_anterior = new Element('input', {type: 'button', 'class': 'botao', value: ' < ', title: 'Página anterior', disabled: ( this._nmr_pagina_atual <= 1 ) })
			.observe('click', this.PaginaAnterior.bind(this) );

		span.appendChild( input_primeiro );
		span.appendChild( input_anterior );

		for( var i = this._nmr_pag_grupo_ini; i < this._nmr_pag_grupo_ini + this._nmr_pag_grupo; i++ ){
			if ( i > this._qtd_paginas ) break;
			var a = new Element('a', {href: 'javascript:void(0)'})
				.update( i )
				.observe('click', this.CarregarPagina.bind( this, i ) );

			if ( i == this._nmr_pagina_atual ) a.setStyle({ 'fontWeight': 'bold' });
			span.appendChild( a );
		}

		var input_proximo = new Element('input', {type: 'button', 'class': 'botao', value: ' > ', title: 'Próxima página', disabled: ( this._nmr_pagina_atual >= this._qtd_paginas ) })
			.observe('click', this.ProximaPagina.bind(this) );

		var input_ultimo = new Element('input', {type: 'button', 'class': 'botao', value: '>>', title: 'Última página'})
			.observe('click', this.UltimaPagina.bind(this) );

		span.appendChild( input_proximo );
		span.appendChild( input_ultimo );

		navegacao.appendChild( span );

		var span = new Element('span', {'class': 'paginacaoRelacPag'})
			.update('Página ' + this._nmr_pagina_atual + ' de ' + this._qtd_paginas + ' (' + this._qtd_registros + ' resultados)' );

		navegacao.appendChild( span );

		if ( this._tabela.parentNode ){
 			if( $('paginacao_navegacao') )
				this._tabela.parentNode.removeChild( $('paginacao_navegacao') );

			if ( this._qtd_registros > 0 )
				this._tabela.parentNode.appendChild( navegacao );
		}
	},

	ProximaPagina : function(){
		this._nmr_pagina_atual++;
		if( this._nmr_pagina_atual > ( this._nmr_pag_grupo_ini + this._nmr_pag_grupo -1) ) this._nmr_pag_grupo_ini++;
		this.CarregarPagina( this._nmr_pagina_atual );
	},

	PaginaAnterior : function(){
		this._nmr_pagina_atual--;
		if( this._nmr_pagina_atual < this._nmr_pag_grupo_ini ) this._nmr_pag_grupo_ini--;
		this.CarregarPagina( this._nmr_pagina_atual );
	},

	PrimeiraPagina : function(){
		this._nmr_pag_grupo_ini = 1;
		this._nmr_pagina_atual = 1;
		this.CarregarPagina( this._nmr_pagina_atual );
	},

	UltimaPagina : function(){
		this._nmr_pagina_atual = this._qtd_paginas;
		this.CalcularNmrGrupoPaginaInicial( this._nmr_pagina_atual );
		this.CarregarPagina( this._nmr_pagina_atual );
	},

	AlterarQtdRegistroPagina : function(){
		this._qtd_registro_pagina = parseInt( $F(this._obter_nome_combobox_reg_pag()), 10);

		SIS.clsGlbSisSistema.CriarCookie( 'sisQtdRegPag', this._qtd_registro_pagina );

		this.CalcularQtdPagina();
		this._nmr_pagina_atual = ( this._nmr_pagina_atual > this._qtd_paginas ) ? this._qtd_paginas : this._nmr_pagina_atual;
		this.CalcularNmrGrupoPaginaInicial( this._nmr_pagina_atual );

		this.CarregarPagina( this._nmr_pagina_atual );
	},

	CarregarPagina : function( p_nmr_pagina ){
		this._nmr_pagina_atual = p_nmr_pagina;

		this.EscoderLinhas();

		var nmr_registro_inicial = (this._nmr_pagina_atual-1) * this._qtd_registro_pagina;
		var nmr_registro_final = nmr_registro_inicial + this._qtd_registro_pagina;
		nmr_registro_final = ( nmr_registro_final < this._qtd_registros ) ? nmr_registro_final : this._qtd_registros;

		// ATENÇÃO: na linha abaixo foi posto, propositalmente, para sempre considerar
		// o registro i+1, pois o componente lista_dados cria uma linha vazia para poder funcionar.
		for(var i = nmr_registro_inicial; i < nmr_registro_final; i++)
			this._tabela.getElementsByTagName('TBODY')[0].rows[i+1].style.display = '';

		this.CriarNavegacao();
	},

	EscoderLinhas : function(){
		for( var i = 0; i <= this._qtd_registros; i++ )
			this._tabela.getElementsByTagName('TBODY')[0].rows[i].style.display = 'none';
	},

	_obter_nome_combobox_reg_pag : function(){
		return 'qtd_registro_pagina_' + this._id;
	}
});

HTML.clsGlbUsrPaginacao.ultimo_id = 0;

//--------------------------------------- Interatividade ----------------------------------------
HTML.clsGlbUsrInteratividade = Class.create();

Object.extend( HTML.clsGlbUsrInteratividade, {
	CriarCaixaDialogo : function( p_dsc_mensagem, p_dsc_titulo, p_dsc_mensagem_detalhe ){
		var dsc_titulo = ( typeof p_dsc_titulo != 'undefined' && p_dsc_titulo != '' ) ? p_dsc_titulo : vNmeSistema;

		if ( $('divMensagem') == null ){
			SIS.clsGlbSisSistema.MostrarLightbox('_cd');

			var arrDimensaoPagina = parent.SIS.clsGlbSisSistema.ObterDimensaoPagina();
			var arrDimensaoScroll = parent.SIS.clsGlbSisSistema.ObterScrollPagina();

			var div_mensagem = new parent.Element('div', {id: 'divMensagem', name:'divMensagem'})
				.setStyle({
					top:  ( arrDimensaoPagina[3] / 2 ) + arrDimensaoScroll[1] - 150 + 'px',
					left: ( arrDimensaoPagina[2] / 2 ) + arrDimensaoScroll[0] - 150 + 'px'
				});

			div_mensagem.insert( new Element('p', {id:'mensagem_titulo', 'class':'titulo'}).update( dsc_titulo ) );
			div_mensagem.insert( new Element('p', {'class':'corpo'}).update( p_dsc_mensagem ) );
			var botoes = new Element('div', {'class': 'botoes'})
				.insert(
					new Element('input', {type: 'button', value: ' Ok ', 'class':'botao'})
						.observe('click', this._fechar_caixa_dialogo )
				);

			if ( !Object.isUndefined( p_dsc_mensagem_detalhe ) && p_dsc_mensagem_detalhe != '' ){
				botoes.insert(
					new Element('div', {'class': 'detalhe'}).update(
						new Element('a', {id:'aBtnDetalhe', href:'javascript:void(0)'})
							.observe('click', function(){
								var v = $('mensagem_detalhe_corpo');
								v.setStyle({ display: ( v.style.display == 'none' ) ? '' : 'none' });
							})
							.update( 'Detalhe' )
					)
				)

				var corpo_detalhe = new Element('div', {id:'mensagem_detalhe_corpo', 'class':'detalhe_corpo'})
					.setStyle({ display:'none' })
					.update( p_dsc_mensagem_detalhe );

					div_mensagem.insert( botoes );
					div_mensagem.insert( corpo_detalhe );
			}else
				div_mensagem.insert( botoes );

			try{
				parent.document.body.appendChild( div_mensagem );
				new Draggable('divMensagem', { handle: 'mensagem_titulo' });
				div_mensagem.down('.botao').focus();
			}catch(e){
				alert( p_dsc_mensagem );
				parent.SIS.clsGlbSisSistema.EsconderLightbox('_cd');
			}
		}
	},

	_fechar_caixa_dialogo : function(){
		parent.SIS.clsGlbSisSistema.EsconderLightbox('_cd');

		if( parent.$('aBtnSalvar') )
			parent.$('aBtnSalvar').disabled = false;

		parent.$('divMensagem').remove();
	},

	criar_notificacao : function( params ){

		var div_notificacao = new Element('div', {'class': 'notificacao', 'id':'notificacao'});
		var div_titulo = new Element('div', {'class': 'titulo'}).update( params.titulo );

		var div_info = new Element('div', {'class': 'info_cabecalho'})
			.update( 'Criado por '+ params.criador +' em ' + params.data );

		var div_corpo = new Element('div', {'class': 'corpo'});
		div_corpo.appendChild( new Element('img', {src: 'http://libwebdes.lbv.org.br/img/icones/'+ params.icone}) );
		div_corpo.appendChild( new Element('div').update( params.corpo ) );

		var div_rodape = new Element('div');
		div_rodape.appendChild( new Element('input', {id: 'ckb_visualizar', name: 'ckb_visualizar', type:'checkbox'}) );
		div_rodape.appendChild( new Element('span', {'class':'campo'}).update('Não mostrar novamente esta mensagem') );

		div_rodape.appendChild( new Element('a', {href: 'javascript:void(0)'})
			.update('Fechar')
			.observe('click', this._inserir_regitsro.bind( this, params.sqc_notificacao_sistema ) )
			.observe('click', function(){
				$('notificacao').remove();
				parent.SIS.clsGlbSisSistema.EsconderLightbox('_nf');
				})
		);

		div_rodape.appendChild( new Element('a', {href: 'javascript:void(0)', id: 'btn_proximo'})
			.update('Próximo >>')
			.observe('click', this._inserir_regitsro.bind( this, params.sqc_notificacao_sistema ) )
			.observe('click', function(){
				//$('notificacao').remove();
				new Ajax.Request('/notificacao/proxima_notificacao', {
					  onComplete: function(requisicao) {
					  	var json = requisicao.responseText.evalJSON(true);
              if ( json == null )
								$('btn_proximo').setStyle({display : 'none'});
						else{
							$('notificacao').remove();
							HTML.clsGlbUsrInteratividade.criar_notificacao( json );
						}
					  }
				});
			})
		);

		div_notificacao.appendChild( div_titulo );
		div_notificacao.appendChild( div_info );
		div_notificacao.appendChild( div_corpo );
		div_notificacao.appendChild( div_rodape );

		document.body.appendChild( div_notificacao );

		addEvent( window, 'load', function (){
			SIS.clsGlbSisSistema.MostrarLightbox('_nf');
		});

	},

	_inserir_regitsro : function ( p_sqc_notificacao_sistema ){
		if ( $F('ckb_visualizar') == 'on' ){
			var url = '/notificacao/inserir_registro_configuracao?p_sqc_notificacao_sistema='+ p_sqc_notificacao_sistema;
			new Ajax.Request(url);
		}
	},

	sta_aberto_carregando : false,

	// Mostra uma imagem avisando que está carregando
	// pAcao: 'mostar' / 'esconder'
	CriarCarregando : function( p_acao ){
		if ( p_acao == 'mostrar' && !this.sta_aberto_carregando ){
			this.sta_aberto_carregando = true;

			//SIS.clsGlbSisSistema.MostrarLightbox('_cr');

			var arrDimensaoPagina = parent.SIS.clsGlbSisSistema.ObterDimensaoPagina();
			var arrDimensaoScroll = parent.SIS.clsGlbSisSistema.ObterScrollPagina();

			var div_carregar = new Element('div', {id: 'div_carregar', 'class': 'div_carregar'})
				.setStyle({
					'top': 	( arrDimensaoPagina[3] / 2 ) + arrDimensaoScroll[1] -150 + 'px',
					'left': ( arrDimensaoPagina[2] / 2 ) + arrDimensaoScroll[0] -20 + 'px'
				})
				.update( new Element('img', {'src': 'http://libweb.lbv.org.br/img/carregar.gif' }) );

			document.body.appendChild( div_carregar );

		} else if ( p_acao == 'esconder' ){
			while ( $('div_carregar') )
				document.body.removeChild( $('div_carregar') );

			this.sta_aberto_carregando = false;
			//parent.SIS.clsGlbSisSistema.EsconderLightbox('_cr');
		}
	},

	MostrarNmrCaraceresRestantes : function( p_obj_text_area, p_obj_caracter ){
		var nmr_caracteres_totais = parseInt( p_obj_text_area.getAttribute( 'maxlength' ), 10 );
		var nmr_caracteres_restantes = nmr_caracteres_totais - p_obj_text_area.value.length;

		if ( parseInt( nmr_caracteres_restantes, 10 ) >= 0 )
			p_obj_caracter.update( ( parseInt( nmr_caracteres_restantes, 10 ) > 0 ) ? nmr_caracteres_restantes + ' caracteres disponíveis.' : '<font color="#ff0000">'+ nmr_caracteres_restantes + ' caracteres disponíveis.</font>' );

		if ( nmr_caracteres_totais < p_obj_text_area.value.length )
			p_obj_text_area.value = p_obj_text_area.value.substr( 0, nmr_caracteres_totais );
	}
});

//--------------------------------------- Formulário ----------------------------------------
HTML.clsGlbUsrFormulario = Class.create();

Object.extend( HTML.clsGlbUsrFormulario, {
	ExecutarMetodoOnEnter : function( p_nme_metodo, e ) {
		var tecla = SIS.clsGlbSisSistema.KeyCode( e );

		if (tecla == 13)
			eval( p_nme_metodo );
	},

	SimularEvento : function( p_id_ou_objeto, p_nme_evento ) {
		if(document.dispatchEvent) { // W3C
			var t = $(p_id_ou_objeto);
			var evento = document.createEvent( "MouseEvents" );
			evento.initMouseEvent( p_nme_evento, true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, t);
			t.dispatchEvent( evento );
		}else if(document.fireEvent) { // IE
			eval( "$('"+p_id_ou_objeto+"').fireEvent(\"on"+p_nme_evento+"\");" );
		}
	},

	// DEPRECATE
	CriarParamInputHidden : function( nmeParam, arrArgumentos, arrNmeAtributos ){
		SIS.clsGlbSisSistema.Deprecate( 'HTML.clsGlbUsrFormulario.CriarParamInputHidden' );

		var vObjBody = document.forms[0];
		var vDelimitador = '/$/';
		var vValor = '';

		for( var x=0; x<arrArgumentos.length; x++ ){
			vValor = '';

			for ( var y=0; y<arrNmeAtributos.length; y++ )
				vValor += eval( 'arrArgumentos['+x+'].'+ arrNmeAtributos[y] ) + vDelimitador;

			var vObjInput = document.createElement('INPUT');

			vObjInput.setAttribute("type",  "hidden");
			vObjInput.setAttribute("name",  nmeParam + "[]");
			vObjInput.setAttribute("id",    nmeParam);
			vObjInput.setAttribute("value", vValor);
			vObjBody.appendChild( vObjInput );
		}
	},

	LimparCampo : function( p_campo ){
		p_campo.value = '';
	},

	LimparCombobox : function( p_combobox, p_nmr_pos_limpar ){
		p_nmr_pos_limpar = ( typeof p_nmr_pos_limpar == 'undefined' ) ? 0 : p_nmr_pos_limpar;

		while( p_combobox.length > p_nmr_pos_limpar )
			p_combobox.options[p_nmr_pos_limpar] = null;
	},

	LimparTodosCampos : function( pLstObjExcecao, pLimparOpts ){
		pLstObjExcecao = ( typeof pLstObjExcecao == 'undefined' ) ? '' : pLstObjExcecao;

		var fomulario = document.forms[0];
		for(var i=0; i < fomulario.elements.length; i++){
			var elemento = fomulario.elements[i];

			if ( pLstObjExcecao.indexOf( elemento.name ) > -1 )
				continue;

			switch(elemento.type){
				case "select-one":
					if ( pLimparOpts )
						while (elemento.length > 1 )
							elemento.options[1] = null;
					elemento.options[0].selected = true;
					break;

				case "text":
					elemento.value = '';
					break;

				case "input":
					elemento.value = '';
					break;
			}
		}
	},

	SelecionarTodosCheckbox : function( p_check_box_princ, p_nme_check_boxs ){
		// Lista dos checkbox que serão manipulados.
		var arr_check_box;

		if( ( arr_check_box = $$('input[name="'+ p_nme_check_boxs +'"]') ).length == 0 ){
			var re = new RegExp( p_nme_check_boxs.replace(/\[\]/g, '[\\w{1,10}]').replace(/\[/g, '\\[').replace(/\]/g, '\\]') );
			arr_check_box = $$('input[type="checkbox"]').findAll(function(n){
				return n.name.search( re ) != -1;
			})
		}

		p_check_box_princ.setAttribute('marc', true);

		arr_check_box.each( function(check){
			check.checked = ( check.disabled ) ? false : p_check_box_princ.checked;

			try{
				check.onclick();
			}catch(e){}

			check.observe( 'click', function (){
				var estado = true;

				if( p_check_box_princ.getAttribute('marc') == true )
					return;

				for(var x = 0; x < arr_check_box.length; x++)
					if( !arr_check_box[x].checked && !arr_check_box[x].disabled ){
						estado = false;
						break;
					};

				p_check_box_princ.checked = estado;
			});
		})

		p_check_box_princ.setAttribute('marc', false);
	},

	DesmarcarRadio : function( p_radio_box ){
		p_radio_box.checked = false;
	},

	DefinirMaxTextArea : function( p_id_ou_objeto, p_id_ou_objeto_caracter ){
		HTML.clsGlbUsrInteratividade.MostrarNmrCaraceresRestantes( $(p_id_ou_objeto), $(p_id_ou_objeto_caracter) );

		$(p_id_ou_objeto).observe('keyup',		HTML.clsGlbUsrInteratividade.MostrarNmrCaraceresRestantes.bind( this, p_id_ou_objeto, p_id_ou_objeto_caracter ) );
		$(p_id_ou_objeto).observe('keydown',	HTML.clsGlbUsrInteratividade.MostrarNmrCaraceresRestantes.bind( this, p_id_ou_objeto, p_id_ou_objeto_caracter ) );
		$(p_id_ou_objeto).observe('change',		HTML.clsGlbUsrInteratividade.MostrarNmrCaraceresRestantes.bind( this, p_id_ou_objeto, p_id_ou_objeto_caracter ) );
	},

	EnviarViaAjax : function( p_id_ou_obj_form, p_id_update, p_funcao ){
		$(p_id_ou_obj_form).request({
			onComplete: function( o ){
				o.responseText.evalScripts();

				if( $(p_id_update) )
					$(p_id_update).update( o.responseText );

				if( Object.isFunction( p_funcao ) )
					p_funcao.apply();
			}
		});
	}
});

//--------------------------------------- Validações ----------------------------------------
HTML.clsGlbUsrValidacao = Class.create();

Object.extend( HTML.clsGlbUsrValidacao, {
	LimparString : function( s ){
		while (s.search(" ")!= -1)
			s = s.replace(" ","");
		return s;
	},

	// DEPRECATE: valide a pesquina na controller.
	ValidarPesquisa : function( condicao ){
		SIS.clsGlbSisSistema.Deprecate( 'HTML.clsGlbUsrValidacao.ValidarPesquisa' );

		if ( !condicao ) HTML.clsGlbUsrInteratividade.CriarCaixaDialogo('Dados insuficientes.\nPor favor, preencha todos os campos.');
		return condicao;
	},

	ValidarPeriodo : function( pDtaInicial, pDtaFinal, pStrNmePeriodo, pNmrPeriodoDias ){
		var vDtaInicial     = new Date( pDtaInicial.substr(3,2) +'/' + pDtaInicial.substr(0,2) + '/' + pDtaInicial.substr(6,4) );
		var vDtaFinal       = new Date( pDtaFinal.substr(3,2) +'/' + pDtaFinal.substr(0,2) + '/' + pDtaFinal.substr(6,4) );
		var vDiferencaDias  = (vDtaFinal - vDtaInicial)/(1000*60*60*24);

		if ( vDtaInicial > vDtaFinal ){
			vMsg = pStrNmePeriodo +' inicial não pode ser maior que ' + pStrNmePeriodo + ' final.'
			vMsg = vMsg.charAt(0).toUpperCase() + vMsg.substring(1, vMsg.length);
			parent.HTML.clsGlbUsrInteratividade.CriarCaixaDialogo( vMsg );
			return false;
		} else if( pNmrPeriodoDias < vDiferencaDias ) {
			parent.HTML.clsGlbUsrInteratividade.CriarCaixaDialogo('Você deve informar um período inferior a '+ pNmrPeriodoDias +' dias.');
			return false;
		} else {
			return true;
		}
	},

	ValidarCampoNumerico : function( e ){
		var tecla = SIS.clsGlbSisSistema.KeyCode( e );

		if( ( tecla != 0 && tecla != 8 ) && ( tecla < 48 || tecla > 57 ) ){
			try{
				event.keyCode = 0;
			}catch(r){
				e.preventDefault();
			}
			return false;
		};
		return true;
	},

	ValidarCampoCaracter : function( e ){
		var tecla = SIS.clsGlbSisSistema.KeyCode( e );

		if ( !( ( tecla >= 65 && tecla <=90 ) || ( tecla >= 97 && tecla <=122 ) ) )  {
			try{
				event.keyCode = 0;
			}catch(r){
				e.preventDefault();
			}
			return false;
		};
		return true;
	},

	ValidarCampoDecimal : function( e, obj ){
		var tecla 			= SIS.clsGlbSisSistema.KeyCode( e );
		var vPosVirgula = parseInt( obj.value.indexOf(','), 10);

		if( ( tecla != 0 && tecla != 8 && tecla != 44 )
			&& ( ( tecla < 48 || tecla > 57 ) || ( obj.value.length - vPosVirgula > 2 && vPosVirgula != -1  ) ) ){
			try{
				event.keyCode = 0;
			}catch(r){
				e.preventDefault();
			}
			return false;
		};
		return true;
	},

	ValidarCamposObrigatorios : function( form ) {
		var dsc_valor_campo;
		var sta_campo_nao_informado = true;

		for(var a = 0; a < form.elements.length; a++){
			var elemento = form.elements[a];

			var dsc_descricao_campo = elemento.getAttribute('descricao');

			var dsc_mensagem = ( dsc_descricao_campo == null ) ?
				'Existem campos obrigatórios não informados' : 'O campo ' + dsc_descricao_campo + ' é uma informação obrigatória';

			if( elemento.getAttribute('obrig') == 'true' ){
				dsc_valor_campo = HTML.clsGlbUsrValidacao.LimparString( elemento.value );

				if( elemento.type != "select-one" ){
					if ( dsc_valor_campo.length == 0 || ( dsc_valor_campo == 0 && elemento.type != 'text' ) ) {
						parent.HTML.clsGlbUsrInteratividade.CriarCaixaDialogo( dsc_mensagem );

						try{
							elemento.activate();
						}catch(e){}

						sta_campo_nao_informado = false;
						break;
					}
				} else {
					if( dsc_valor_campo == 0 || dsc_valor_campo == -1 || dsc_valor_campo == '' ){
						parent.HTML.clsGlbUsrInteratividade.CriarCaixaDialogo( dsc_mensagem );
						elemento.activate();
						sta_campo_nao_informado = false;
						break;
					}
				}
			}
		}

		return sta_campo_nao_informado;
	},

	ValidarCampoData : function( data ){
		var expReg = /^(([0-2]\d|[3][0-1])\/([0]\d|[1][0-2])\/[1-2][0-9]\d{2})$/;
		var retorno = true;

		if (!data.value.match( expReg ) && data.value != ''){
			parent.HTML.clsGlbUsrInteratividade.CriarCaixaDialogo( 'Formato inválido de data.' );
			data.activate();
			retorno = false;
		}

		return retorno;
	},

	ValidarCampoDataMesAno : function( data ){
		var expReg = /^(([0]\d|[1][0-2])\/[1-2][0-9]\d{2})$/;
		var retorno = true;

		if (!data.value.match( expReg ) && data.value != '') {
			parent.HTML.clsGlbUsrInteratividade.CriarCaixaDialogo('Formato inválido de data.');
			data.focus();
			retorno = false;
		}
		return retorno;
	}
});

//------------------------------------------------ Formatações ---------------------------------------------
HTML.clsGlbUsrFormatacao = Class.create();

Object.extend( HTML.clsGlbUsrFormatacao, {
	FormatarData : function( data, e ){
		HTML.clsGlbUsrValidacao.ValidarCampoNumerico( e );

		switch( parseInt( data.value.length, 10 ) ){
			case 2 :
				data.value += '/';
				break;

			case 5 :
				data.value += '/';
				break;
		}
	},

	FormatarDataMesAno : function( data, e ){
		HTML.clsGlbUsrValidacao.ValidarCampoNumerico( e );

		switch( parseInt( data.value.length, 10 ) ){
			case 2 :
				data.value += '/';
				break;
		}
	},

	FormatarTelefone : function( telefone, e ){
		HTML.clsGlbUsrValidacao.ValidarCampoNumerico( e );

		switch( parseInt( telefone.value.length, 9 ) ){
			case 4 :
				telefone.value += '-';
				break;
		}
	},

	// Limpa todos os caracteres especiais do campo solicitado
	LimparCaracteresEspeciais : function(campo){
		var s = "";
		var cp = "";
		vr = campo.value;
		tam = vr.length;

		for (i = 0; i < tam ; i++) {
			if (vr.substring(i,i + 1) != "/" && vr.substring(i,i + 1) != "-" && vr.substring(i,i + 1) != "." && vr.substring(i,i + 1) != "," ){
				s = s + vr.substring(i,i + 1);}
		}
		campo.value = s;
		return cp = campo.value
	},

/*
	FormatarMoeda : function( moeda, e ){

		campo.value = HTML.clsGlbUsrFormatacao.LimparCaracteresEspeciais(campo);
		vr = campo.value;
		tam = vr.length;

		if ( tam <= 2 ){
			campo.value = vr ; }

		if ( (tam > 2) && (tam <= 5) ){
			campo.value = vr.substr( 0, tam - 2 ) + ',' + vr.substr( tam - 2, tam ) ; }

		if ( (tam >= 6) && (tam <= 8) ){
			campo.value = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }

		if ( (tam >= 9) && (tam <= 11) ){
			campo.value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }

		if ( (tam >= 12) && (tam <= 14) ){
			campo.value = vr.substr( 0, tam - 11 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }

		if ( (tam >= 15) && (tam <= 18) ){
			campo.value = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;}
	},

	FormatarCampoValorMoeda : function(campo) {
	},

	// Colocar esse metodo no onblur do campo
	FormatarCampoValorMoedaSaida : function(campo) {
		if (campo.value.length < 3 && campo.value.length > 0) {
			campo.value = campo.value + "00";
			HTML.clsGlbUsrFormatacao.FormatarCampoValorMoeda(campo);
		}
	},

	// Formata o valor de moeda brasileira.
	FormatarValorMoeda : function( pVlr ){
		var vValor = pVlr;

		vValor = vValor.toString().replace(/\$|\,/g,'');
		if(isNaN(vValor))
			vValor = '0';
		sign = (vValor == (vValor = Math.abs(vValor)));
		vValor = Math.floor(vValor*100+0.50000000001);
		cents = vValor%100;
		vValor = Math.floor(vValor/100).toString();
		if(cents<10)
			cents = '0' + cents;
		for (var i = 0; i < Math.floor((vValor.length-(1+i))/3); i++)
			vValor = vValor.substring(0,vValor.length-(4*i+3))+'.'+
		vValor.substring(vValor.length-(4*i+3));
		return (((sign)?'':'-') + vValor + ',' + cents);
	},
*/

	Trim : function( p_str ){
		return p_str.strip();
	}
});

//--------------------- Funções de interface dos componentes ------------------------------------
function mensagem( params ){
	HTML.clsGlbUsrInteratividade.CriarCaixaDialogo( params.msg, params.titulo, params.msg_detalhe );
};

function abrir_formulario( params ){
	HTML.clsGlbUsrPopUp.AbrirFormulario( params.url, params.altura, params.largura, params.tpo_popup );
};

function combobox( params ){
	// Tradução dos parâmetros deprecates...
	if( params.pURL )
		params.url	= params.pURL;

	if( params.pURLParams )
		params.url_params	= params.pURLParams;

	if( params.pStaOptionBranco )
		params.incluir_branco	= params.pStaOptionBranco;

	if( params.pNmrPosicaoLimpar)
		params.posicao_limpar	= params.pNmrPosicaoLimpar;

	if( params.pObjCombobox )
		params.combobox = params.pObjCombobox;

	if( params.pValorSelec )
		params.valor_padrao = params.pValorSelec;
	//--------------------------------------------

	var ajax = new clsSisUsrAjax();
	ajax.exibir_combobox( params );
};

function validar_campos_obrigatorios( form ){
	return HTML.clsGlbUsrValidacao.ValidarCamposObrigatorios( form );
};

function lista_dados( params ){
	// PARÂMETROS: url, url_params e sufixo (opcional).

	var sufixo = ( Object.isUndefined( params.sufixo ) ? '' : params.sufixo );
	updaterAjax('ResultadoCorpo' + sufixo, params.url + '/?' + params.url_params);
};

function filtro_dados( params ){
	// PARÂMETROS: url, url_params e sufixo (opcional).
	lista_dados( params );
};

function excluir_item_lista( p_url, p_params, p_funcao_retorno, p_perguntar ){
	if( ( p_perguntar ) ? confirm('Deseja excluir esse registro?') : true )
		requestAjax( p_url, p_params, function( requisicao ){
			eval( requisicao.responseText );

			if( Object.isFunction( p_funcao_retorno ) )
				p_funcao_retorno.apply();
			else
				eval( p_funcao_retorno );
		});
};

function alterar_situacao_item_lista( p_url, p_params, p_funcao_retorno, p_perguntar ){
	if ( ( p_perguntar ) ? confirm('Deseja alterar esse registro?') : true )
		requestAjax( p_url, p_params, function( requisicao ){
			eval( requisicao.responseText );

			if( Object.isFunction( p_funcao_retorno ) )
				p_funcao_retorno.apply();
			else
				eval( p_funcao_retorno );
		});
};

function fnAlterarSituacaoItemLista( p_url, p_params, p_funcao_retorno, p_perguntar ){
	alterar_situacao_item_lista( p_url, p_params, p_funcao_retorno, p_perguntar );
};

function fnExcluirItemLista( p_url, p_params, p_funcao_retorno, p_perguntar ){
	excluir_item_lista( p_url, p_params, p_funcao_retorno, p_perguntar );
};

//-------------------------- Métodos deprecates --------------------------

// DEPRECATE: usar o método combobox
function Select( params ){
	SIS.clsGlbSisSistema.Deprecate( 'Select' );
	combobox( params )
};

// DEPRECATE
function auto_completar( params ){
	// Tradução dos parâmetros deprecates...
	if( params.pURL )
		params.url	= params.pURL;

	if( params.pURLParams )
		params.url_params	= params.pURLParams;

	if( params.pObjHTMLDescricao )
		params.campo_descricao = params.pObjHTMLDescricao;

	if( params.pObjHTMLCodigo )
		params.campo_hidden = params.pObjHTMLCodigo;

	if( params.pFuncaoAposSelecao )
		params.func_apos_selecao = params.pFuncaoAposSelecao;
	//--------------------------------------------

	var ajax = new clsSisUsrAjax();
	ajax.exibir_lista( params );
};

//-------------------------- Funções deprecate (somente usadas no Comissão) --------------------------
/*
function fnLimparTabela( p_obj_tabela ){
	SIS.clsGlbSisSistema.Deprecate( 'fnLimparTabela' );

	// Limpa todos os registros da tabela.
	if( !p_obj_tabela.tFoot ){
		while( p_obj_tabela.rows[p_obj_tabela.tHead.rows.length ] )
			p_obj_tabela.deleteRow( p_obj_tabela.tHead.rows.length );
	}else{
		for( var x=p_obj_tabela.tHead.rows.length; x<(p_obj_tabela.rows.length - p_obj_tabela.tFoot.rows.length); x++ )
			p_obj_tabela.deleteRow(0);
	}
};

function fnDeletarRegistroTabela( tabela, row ){
	var tabela = $(tabela);

	if ( row == 'T' ) {
	  while ( tabela.rows[1] )
		tabela.deleteRow(1);
	} else {
	  tabela.deleteRow(row);
	}
};
*/