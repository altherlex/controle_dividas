# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def usuario_logado?
    session[:usuario_id]
  end
end
