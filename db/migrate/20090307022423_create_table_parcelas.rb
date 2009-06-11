class CreateTableParcelas < ActiveRecord::Migration
	def self.up
		create_table :parcelas do |t|
			t.references :divida
			t.string  :tpo_notificacao, :limit => 1
			t.decimal :preco
			t.decimal :juros
			t.decimal :multa
			t.boolean :pago
			t.timestamps
		end
	end

	def self.down
		drop_table :parcelas
	end
end
