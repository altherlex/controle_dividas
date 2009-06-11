class Divida < ActiveRecord::Base
	belongs_to :Cliente
	has_many :Parcelas

	validates_presence_of :descricao, :message => 'É necessário uma descrição para a dívida.'

	def self.parcelas_da_divida(id_cliente)
		divida = find_by_cliente_id(id_cliente)
		return nil if divida.nil?
		divida.Parcelas
	end
	
	def self.carregar_divida(p_cliente_id, p_ano = Date.today.year)
		find(
			:all, 
			:include => :Parcelas,
			:conditions => ['cliente_id = ?',p_cliente_id])
	end
end
