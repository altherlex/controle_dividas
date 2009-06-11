class AdminController < ApplicationController
  filter_parameter_logging "senha"
  
  def index
    reset_session
    redirect_to :action => :login
  end

  def login
    usuario = Usuario.autenticar(params[:usuario], params[:senha])

    if usuario
      session[:usuario_id] = usuario.id
      redirect_to :controller => :clientes
    else
      render :action => :index
    end
  end

  def logout
    reset_session
    redirect_to :action => :index
  end
end
