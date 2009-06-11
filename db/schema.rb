# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20090418030821) do

  create_table "clientes", :force => true do |t|
    t.string   "empresa"
    t.string   "nome"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "dividas", :force => true do |t|
    t.integer  "cliente_id"
    t.string   "descricao",    :limit => 100
    t.integer  "nmr_parcelas"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "parcelas", :force => true do |t|
    t.integer  "divida_id"
    t.string   "tpo_notificacao", :limit => 1
    t.integer  "preco",           :limit => 10, :precision => 10, :scale => 0
    t.integer  "juros",           :limit => 10, :precision => 10, :scale => 0
    t.integer  "multa",           :limit => 10, :precision => 10, :scale => 0
    t.boolean  "pago"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.date     "data_vencimento"
    t.integer  "parcela"
  end

  create_table "usuarios", :force => true do |t|
    t.string   "usuario",                        :null => false
    t.string   "senha_encriptada", :limit => 32
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
