class Usuario < ActiveRecord::Base
  validates_presence_of   :usuario, :message => 'Deve ser informado um login.'
  validates_presence_of   :senha_encriptada, :message => 'Deve ser informado uma senha.'
  validates_uniqueness_of :usuario, :message => 'Informe outro login pois este já existe.'
  
  validates_length_of :senha_encriptada, :minimum => 4, :message => "Senha deve ter no mínimo {{count}} caracteres."
  validates_length_of :usuario, :minimum => 4, :message => "Login deve ter no mínimo {{count}} caracteres."  

  attr_accessor :senha

  def before_validation
    return if self.senha.nil? || self.senha.empty?
    self.senha_encriptada = Usuario.encriptar(self.senha)
  end

  def self.autenticar(usuario, senha)
    return false if senha.nil?
    Usuario.find_by_usuario_and_senha_encriptada(usuario, Usuario.encriptar(senha))
  end

  def self.encriptar(uma_string)
    return nil if uma_string.nil?
    Digest::MD5.hexdigest(uma_string.downcase)
  end
end
