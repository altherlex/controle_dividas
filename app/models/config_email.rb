class ConfigEmail
 
  ROOT = File.join( Dir.getwd, 'config/config.yml')

  def self.carregar_dados()
    YAML::load( File.open( ROOT ) )
  rescue => e
    nil
  end
	
  def self.salvar(p_params)
    f = File.new( ROOT, 'w+')
    f.write(p_params.to_yaml)
    f.close
    true 	
  rescue => e
    "Erro: #{e}. Confira o erro juntamento com o administrador do servidor."
  end
end
