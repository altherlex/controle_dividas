#-------------------------------------------------------------------------------------------------
# Modelos de formata��o de data/hora
# Ex: @pessoa.dta_cadastro.to_s(:criado) #=> 'Criado �s 20/10/2008 20:12:25'
# 		@pessoa.dta_cadastro.to_s(:atualizado) #=> 'Atualizado �s 20/10/2008 20:12:25'
Date::DATE_FORMATS[:data] = Time::DATE_FORMATS[:data] = "%d/%m/%Y"
Date::DATE_FORMATS[:mes_ano] 	= "%m/%Y"
Time::DATE_FORMATS[:data_hora]	= "%d/%m/%Y �s %H:%M"
Time::DATE_FORMATS[:hora] 	= "%H:%M:%S"
Time::DATE_FORMATS[:criado]	= "Criado �s %d/%m/%Y %H:%M"
Time::DATE_FORMATS[:atualizado] = "Atualizado �s %d/%m/%Y %H:%M"
#-------------------------------------------------------------------------------------------------
