class CreateUsuarios < ActiveRecord::Migration
  def self.up
    create_table :usuarios do |t|
      t.string :usuario, :null => false
      t.string :senha_encriptada, :limit => 32
      t.timestamps
    end
  end

  def self.down
    remove_index :usuarios, :email
    drop_table :usuarios
  end
end
