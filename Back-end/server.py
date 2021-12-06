from flask.wrappers import Request
from config import *
from modelo_cadastro import *

@app.route("/")

def menu_padrão():
    return ("Servidor ok")



# listar todos os pacientes registrados
@app.route("/listar/<string:classe>", methods=['GET'])

def listar(classe):
    dados = None 
    if classe == "Paciente":
        dados = db.session.query(Paciente).all() 
    elif classe == "Medico": 
        dados = db.session.query(Medico).all() 
    elif classe == "Consulta": 
        dados = db.session.query(Consulta).all() 
    elif classe == "Exame":
        dados = db.session.query(Exame).all() 
   
    
    lista_jsons = [ x.json() for x in dados ]
    

    resposta = jsonify(lista_jsons) 
    
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta

   

@app.route("/cadastrar/<string:classe>", methods=['POST'])

def cadastrar(classe):
    # obter os dados da classe informada
    resposta = jsonify({"resultado": "ok"})
    dados = request.get_json()
    if classe == "Paciente":
        novo_paciente = Paciente(**dados)
        db.session.add(novo_paciente)
        db.session.commit()
    
    elif classe == "Medico":
        novo_medico = Medico(**dados)
        db.session.add(novo_medico)
        db.session.commit()

    elif classe == "Consulta":
        novo_consulta = Consulta(**dados)
        db.session.add(novo_consulta)
        db.session.commit()
    
    elif classe == "Exame":
        novo_exame = Exame(**dados)
        db.session.add(novo_exame)
        db.session.commit()
   

    resposta.headers.add("Access-Control-Allow-Origin","*")

    return resposta






# listar dados de uma pessoa especifica
@app.route("/listar_paciente/<int:id_paciente>", methods=['GET'])

def dados_paciente(id_paciente):
    dados = Paciente.query.get_or_404(id_paciente)
    return (dados.json())



# listar dados de uma consulta especifica
@app.route("/listar_consulta_esp/<int:id_consulta>", methods=['GET'])

def dados_consulta_esp(id_consulta):
    
    dados = Consulta.query.get_or_404(id_consulta)
    return (dados.json())

# listar consultas de um paciente
@app.route("/listar_consulta/<int:paciente_id>", methods=['GET'])

def dados_consulta(paciente_id):
    retorno = []
    consultas = db.session.query(Consulta).all()
    for consulta in consultas:
        if consulta.paciente_id_consulta == paciente_id:
            retorno.append(consulta.json())
    
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


# listar exames de um paciente
@app.route("/listar_exames_paciente/<int:paciente_id>", methods=['GET'])

def listar_exames_paciente(paciente_id):
    retorno = []
    exames = db.session.query(Exame).all()
    for exame in exames:
        if exame.paciente_id_exame == paciente_id:
            retorno.append(exame.json())
    
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta




#listar um exame pelo id
@app.route("/listar_exame_esp/<int:id_exame>", methods=['GET'])

def dados_exame_esp(id_exame):
    dados = Exame.query.get_or_404(id_exame)
    return (dados.json())


# desmarcar uma consulta para o paciente
@app.route("/desmarcar_consulta/<int:id_consulta>", methods=['DELETE'])

def desmarcar_consulta(id_consulta):
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try: 
        consulta = Consulta.query.get(id_consulta)
        db.session.delete(consulta)
        db.session.commit()
        
    
        
    except Exception as e:  
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta




# desmarcar um exame
@app.route("/desmarcar_exame/<int:id_exame>", methods=['DELETE'])

def desmarcar_exame(id_exame):
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try: #Tentar realizar a exclusão
        exame = Exame.query.get(id_exame)
        
        db.session.delete(exame)
        db.session.commit()
        
    
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta



# Remarcar uma consulta para o paciente
@app.route("/remarcar_consulta/<int:id_consulta>",  methods=['POST'])
def remarcar_consulta(id_consulta):
   
    dados = request.get_json()
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try:
        consulta = Consulta.query.get_or_404(id_consulta)
        
        consulta.motivo = dados["novo_motivo"]                                 
        consulta.dataConsulta = dados["nova_data"]
        consulta.medico_id_consulta  = dados["novo_medico"]
        db.session.commit()
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

# Remarcar um exame para o paciente
@app.route("/remarcar_exame/<int:id_exame>",  methods=['POST'])
def remarcar_exame(id_exame):
   
    dados = request.get_json()
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try:
        exame = Exame.query.get_or_404(id_exame)

        exame.dataExame =  dados["dataExameRemarcar"]
        exame.tipoExame = dados["tipoExameRemarcar"]
        exame.medico_id_exame = dados["selectMedicoSolicitanteRemarcar"]
        exame.consulta_id_exame = dados["dataSolicitacaoRemarcar"]
        exame.resultado_exame = dados["resultadoExameRemarcar"]

        db.session.commit()
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


# login do usuario
@app.route("/logarpaciente", methods=['GET', 'POST'])
def logarpaciente():
	
    dados = request.get_json()
    resposta = jsonify({"resultado": "logoff", "id_pac": "int"})
    
    paciente = db.session.query(Paciente).filter((Paciente.usuario == dados["usuario"]) | (Paciente.email == dados["usuario"])).first()
    
    if paciente.senha == dados["senha"]:
        resposta = jsonify({"resultado":  "OK", "paciente_id": paciente.id_paciente})
    else:
        resposta = jsonify({"resultado":  "Erro"})

    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 
    


app.run(debug = True, host = "0.0.0.0")