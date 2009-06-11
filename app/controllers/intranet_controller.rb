class IntranetController < ApplicationController

  before_filter :verificar_se_usuario_logado

  def verificar_se_usuario_logado
    unless session[:usuario_id]
      redirect_to :controller => :admin
    end
  end
end
