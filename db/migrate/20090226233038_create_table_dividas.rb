class CreateTableDividas < ActiveRecord::Migration
	def self.up
		create_table :dividas do |t|
			t.references :cliente
			t.string  :descricao, :limit=> 100
			t.integer :nmr_parcelas
			t.timestamps
		end
	end

	def self.down
		drop_table :dividas
	end
end
