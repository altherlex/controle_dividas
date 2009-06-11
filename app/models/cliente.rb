class Cliente < ActiveRecord::Base
	has_many :Dividas
=begin
	def cliente_devedor?()
		Cliente.find(:all)
	end
=end
end
