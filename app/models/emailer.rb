 require 'ActionMailer'
class Emailer < ActionMailer::Base


=begin
	def initialize
		@params = carregar_dados()
		#@receptor = p_receptor
	end
=end


	def self.carrega_dados()
		arr_local = Dir.getwd.split('/')
		arr_local.delete_at(arr_local.size-1)
		arr_local.delete_at(arr_local.size-1)
		local = arr_local.join( File::SEPARATOR )

		arq = File.open(File.join( local, 'config/config.yml'))  
		YAML::load(arq)["config"]
	rescue => e
		nil
		#puts 'nao deu certo'
	end

=begin
Exemplo
	def contact(recipient, subject, message, sent_at = Time.now)
		@subject = subject
		@recipients = recipient
		@from = 'no-reply@yourdomain.com'
		@sent_on = sent_at
		  	@body["title"] = 'This is title'
			@body["email"] = 'sender@yourdomain.com'
	   		@body["message"] = message
		@headers = {}
	end
=end

	def self.enviar_email(params)
		ActionMailer::Base.smtp_settings = {
			:address          => params["address"],
			:port             => params["port"],
			:domain           => params["domain"],
			:user_name        => params["user_name"],
			:password         => params["password"],
			:authentication   => (params["authentication"].nil? ? nil : params["authentication"].to_sym)
		}
        
=begin
		recipients "#{params.dsc_endereco_email}"
		from "#{params.CaixaPostal.nme_caixa_postal} <#{email.CaixaPostal.dsc_endereco_email}>"
		subject "#{email.dsc_assunto_email}"
		content_type "text/html"
		charset "ISO-8859-1"
		txt_email = ( email.cdg_peca.nil? ? email.txt_conteudo_email_manual : email.Peca.txt_conteudo_email )         
		txt_email = txt_email.sub('[SQC_EMAIL]', email.sqc_correspondencia_enviada.to_s)
		txt_email = txt_email.sub('[DSC_EMAIL]', email.dsc_endereco_email)
		txt_email = txt_email.sub('[NOME]', ( email.cdg_pessoa.nil? ? email.nme_pessoa : email.Pessoa.nme_pessoa ))
		body "#{txt_email}"
=end
		# Email header info MUST be added here
		recipients 'Altherlex'
		from  "altherlg@lbv.org.br"
		subject "Thank you for registering with our website"

		# Email body substitutions go here
		body 'testando som'
	end
end

Emailer.new
puts 'Prepado para receber um e-mail?'

params = Emailer.carrega_dados()
puts params.to_yaml
puts '-'*30


#Notifier.deliver_signup_notification(david)
mail =  Emailer.create_enviar_email(params)
Emailer.deliver(mail)


#Emailer.deliver_enviar_email(params)
puts 'E-mail enviado com sucesso!!!'

