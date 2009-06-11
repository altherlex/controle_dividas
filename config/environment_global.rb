#-------------------------------------------------------------------------------------------------
# Modelos de formatação de data/hora
# Ex: @pessoa.dta_cadastro.to_s(:criado) #=> 'Criado às 20/10/2008 20:12:25'
# 		@pessoa.dta_cadastro.to_s(:atualizado) #=> 'Atualizado às 20/10/2008 20:12:25'
Date::DATE_FORMATS[:data] = Time::DATE_FORMATS[:data] = "%d/%m/%Y"
Date::DATE_FORMATS[:mes_ano] 	= "%m/%Y"
Time::DATE_FORMATS[:data_hora]	= "%d/%m/%Y às %H:%M"
Time::DATE_FORMATS[:hora] 	= "%H:%M:%S"
Time::DATE_FORMATS[:criado]	= "Criado às %d/%m/%Y %H:%M"
Time::DATE_FORMATS[:atualizado] = "Atualizado às %d/%m/%Y %H:%M"
#-------------------------------------------------------------------------------------------------
