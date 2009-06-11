class DividasController < IntranetController
  # GET /dividas
  # GET /dividas.xml
  def index
    @dividas = Divida.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @dividas }
    end
  end

  # GET /dividas/1
  # GET /dividas/1.xml
  def show
    @divida = Divida.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @divida }
    end
  end

  # GET /dividas/new
  # GET /dividas/new.xml
  def new
    @divida = Divida.new
    
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @divida }
    end
  end

  # GET /dividas/1/edit
  def edit
    @divida = Divida.find(params[:id])
  end

  # POST /dividas
  # POST /dividas.xml
  def create
  #TO DO:
  #  - VER OS VALIDATES DA MODEL PARCELA
  #  - NÃO PERMITIR QUE SEJA INFORMADO UMA DATA ANTERIOR A CORRENTE
  	begin
		@divida = Divida.new(params[:divida])
		@divida.cliente_id = session[:usuario_cad].id
		@divida.save

		arr_venc_inicial = params[:Data_venc].to_a.map{|v| v[1]}

		dta_parcela = Date.new(arr_venc_inicial[0].to_i, arr_venc_inicial[1].to_i, arr_venc_inicial[2].to_i)

		(1..params[:divida][:nmr_parcelas].to_i).to_a.each do |parcela|
			@parcela = @divida.Parcelas.new(params[:Parcelas])
			@parcela.divida_id = @divida.id
			@parcela.tpo_notificacao = 0
			@parcela.pago = false
			@parcela.parcela = parcela
			@parcela.data_vencimento = dta_parcela
			#raise ActiveRecord::RecordInvalid.new( @parcela ) if Parcela.valid?
			@parcela.save
			dta_parcela = dta_parcela.next_month
		end
		@divida.save
		render :text => "<script>alert('Salvo com sucesso.'); window.close();</script>"
	rescue ArgumentError => e
		flash[:error] = "Falha ao salvar: <br />-Data inv&aacute;lida!"
		redirect_to :action => "new"
	rescue => e
		flash[:error] = "Falha ao salvar: <br />#{e}"
		redirect_to :action => "new"
	end

#        flash[:notice] = "<script>alert('salvo com sucesso.');</script>"
#        format.html { redirect_to(@divida) }
#        format.xml  { render :xml => @divida, :status => :created, :location => @divida }
#      else
#	 flash[:notice] = 'Falha ao salvar. Tente novamente.'
#        format.html { render :action => "new" }
#        format.xml  { render :xml => @divida.errors, :status => :unprocessable_entity }
#      end
#    end
end

  # PUT /dividas/1
  # PUT /dividas/1.xml
  def update
    @divida = Divida.find(params[:id])

    respond_to do |format|
      if @divida.update_attributes(params[:divida])
        flash[:notice] = 'Divida was successfully updated.'
        format.html { redirect_to(@divida) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @divida.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /dividas/1
  # DELETE /dividas/1.xml
  def destroy
    @divida = Divida.find(params[:id])
    @divida.destroy

    respond_to do |format|
      format.html { redirect_to(dividas_url) }
      format.xml  { head :ok }
    end
  end
  
  def carrega_lst_dividas
  	#return unless request.xhr?
    @dividas = Divida.carregar_divida( params[:p_cliente_id], params[:p_ano] )
  	render :partial => "divida", :collection => @dividas, :locals => { :modo_tela => params[:p_modo_tela].to_s }
#  rescue 
#  	render :js => "alert('Falha ao carregar a lista de dividas');"  	
  end
end
