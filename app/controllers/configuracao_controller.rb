class ConfiguracaoController < IntranetController
  def index 
  end
  
  def email
    @email = ConfigEmail.carregar_dados
   end
  
  def update
    parametros = params.reject{|k,v| k == "commit" || k == "action" || k == "controller"}
    retorno = ConfigEmail.salvar( parametros )
    raise retorno   if retorno.class == String
    redirect_to :action => 'index'
  end
  
  def template
    
  end
end
