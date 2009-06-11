class AddColumnParcelasIndiceVenc < ActiveRecord::Migration
  def self.up
	  add_column :parcelas, :data_vencimento, :date
	  add_column :parcelas, :parcela, :integer
  end

  def self.down
	  remove_column :parcelas, :data_vencimento
	  remove_column :parcelas, :parcela
  end
end
