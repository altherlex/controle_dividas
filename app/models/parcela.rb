class Parcela < ActiveRecord::Base
	belongs_to :Divida
	
	validates_numericality_of :parcela, 	:message => 'Dado incorretamente para número de parcelas'
	validates_numericality_of :juros, 	:message => 'Dado incorretamente para juros'
	validates_numericality_of :multa, 	:message => 'Dado incorretamente para multa'
	validates_numericality_of :preco, 	:message => 'Dado incorretamente para preco'
	
	validates_presence_of 	  :preco,           :message => 'Campo obrigatório: Valor parcela	'
	validates_presence_of 	  :data_vencimento, :message => 'Campo obrigatório: Início das parcelas'
	validates_presence_of 	  :parcela,         :message => 'Campo obrigatório: Nº parcelas'
	
	def validate
		errors.add(:data_vencimento, '- Data inválida')  if self[:data_vencimento] <= Date.today
  	end
end
