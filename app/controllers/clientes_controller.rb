class ClientesController < IntranetController
  # GET /clientes
  # GET /clientes.xml
  def index
    # ADICIONAR NA TABELA DIVIDAS UM CAMPO STA_SITUACAO PARA INDICAR SE ESTÁ ATIVA OU INATIVA TAL DIVIDA...
    #@devedor? =
    @clientes = Cliente.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @clientes }
    end
  end

  # GET /clientes/1
  # GET /clientes/1.xml
  def show
    @cliente = Cliente.find(params[:id])
    session[:usuario_cad] = @cliente
  end

  # GET /clientes/new
  # GET /clientes/new.xml
  def new
    @cliente = Cliente.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @cliente }
    end
  end

  # GET /clientes/1/edit
  def edit
    session[:usuario_cad] = Cliente.find(params[:id])   if  session[:usuario_cad].nil?
    @cliente = session[:usuario_cad]
  end

  # POST /clientes
  # POST /clientes.xml
  def create
    @cliente = Cliente.new(params[:cliente])

    respond_to do |format|
      if @cliente.save
        flash[:notice] = 'Cliente was successfully created.'
        format.html { redirect_to(@cliente) }
        format.xml  { render :xml => @cliente, :status => :created, :location => @cliente }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @cliente.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /clientes/1
  # PUT /clientes/1.xml
  def update
    @cliente = Cliente.find(params[:id])

    #ERRO:
    #  Ver o update gerado. Não está atualizando o campo pago ndo parcela corrente
    if !params[:ckb_parcela].nil?
      @cliente.Dividas.each do |divida|
          divida.Parcelas.each_with_index do |parcela, i|
            if params[:ckb_parcela][(i+1).to_s.inspect] == "on"
              parcela.update_attribute(:pago, true)
            else
              parcela.update_attribute(:pago, false)   
            end
          end
      end
    end

    respond_to do |format|
      if @cliente.update_attributes(params[:cliente])
        flash[:notice] = 'Cliente was successfully updated.'
        format.html { redirect_to(@cliente) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @cliente.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /clientes/1
  # DELETE /clientes/1.xml
  def destroy
    @cliente = Cliente.find(params[:id])
    @cliente.destroy

    respond_to do |format|
      format.html { redirect_to(clientes_url) }
      format.xml  { head :ok }
    end
  end
end
