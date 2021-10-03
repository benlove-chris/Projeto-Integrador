from config import *
from modelo_cadastro import *

@app.route("/")

def inicio():
    return ("Aqui vai uma mensagem de boas vindas (img/outro)")

# listar todos os pacientes registrados
@app.route("/listar_pacientes", methods=['GET'])

def listar_pacientes():
    pacientes = db.session.query(Paciente).all()
    retorno = []

    for paciente in pacientes:
        retorno.append(paciente.json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


# listar todas as consultas marcadas
@app.route("/listar_consultas", methods=['GET'])

def listar_consultas():
    consultas = db.session.query(MarcarConsulta).all()
    retorno = []

    for consulta in consultas:
        retorno.append(consulta.json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta



# listar todos os medicos registrados
@app.route("/listar_medicos", methods=['GET'])

def listar_medicos():
    medicos = db.session.query(Medico).all()
    retorno = []

    for medico in medicos:
        retorno.append(medico.json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta



# listar dados de uma pessoa especifica
@app.route("/listar_paciente/<int:id_paciente>", methods=['GET'])

def dados_paciente(id_paciente):
    #dados = Paciente.query.get()
    dados = Paciente.query.get_or_404(id_paciente)
    return (dados.json())



# listar dados de uma consulta especifica
@app.route("/listar_consulta_esp/<int:id_consulta>", methods=['GET'])

def dados_consulta_esp(id_consulta):
    #dados = Paciente.query.get()
    dados = MarcarConsulta.query.get_or_404(id_consulta)
    return (dados.json())

# listar consultas de um paciente
@app.route("/listar_consulta/<int:paciente_id>", methods=['GET'])

def dados_consulta(paciente_id):
    #dados = Paciente.query.get()
    retorno = []
    #dados = MarcarConsulta.query.get_or_404(paciente_id)
    consultas = db.session.query(MarcarConsulta).all()
    for consulta in consultas:
        if consulta.paciente_id_consulta == paciente_id:
            retorno.append(consulta.json())
    
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta




# incluir/cadastrar um paciente
@app.route("/cadastrar_paciente", methods=['POST'])

def cadastrar_paciente():
    #db.create_all()
    dados = request.get_json()
    novo_paciente = Paciente(**dados)
    db.session.add(novo_paciente)
    db.session.commit()

    return {"resultado":'ok'}


# marcar consulta
@app.route("/marcar_consulta", methods=['POST'])

def marcar_consulta():

    resposta = jsonify({"resultado": "ok"})
    dados = request.get_json()
    nova_consulta = MarcarConsulta(**dados)
    #nova_consulta.headers.add("Access-Control-Allow-Origin", "*")
    db.session.add(nova_consulta)
    db.session.commit()

    resposta.headers.add("Access-Control-Allow-Origin","*")

    return resposta



# desmarcar uma consulta para o paciente
@app.route("/desmarcar_consulta/<int:id_consulta>", methods=['DELETE'])

def desmarcar_consulta(id_consulta):
    
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    try: #Tentar realizar a exclusão
        consulta = MarcarConsulta.query.get(id_consulta)
        
        db.session.delete(consulta)
        #redistribuir_consulta()
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
        consulta = MarcarConsulta.query.get_or_404(id_consulta)
        
        consulta.motivo = dados["novo_motivo"]                                 
        consulta.data = dados["nova_data"]
        consulta.medico= dados["novo_medico"]
        db.session.commit()
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta




# editar dados do paciente - a resolver
@app.route("/editar_paciente/<int:id_paciente>",  methods=['POST'])
def editar_paciente(id_paciente):
   
    dados = request.get_json()
    resposta = jsonify({"resultado":"ok","detalhes": "ok"})
    
    
    
    try:
        paciente = Paciente.query.get_or_404(id_paciente)
        
        
        paciente.nome = dados["novo_nome"]
        #paciente.sobrenome = dados["novo_sobrenome"]
        db.session.commit()
        
    except Exception as e:  #Envie mensagem em caso de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
        
    resposta.headers.add("Access-Control-Allow-Origin","*")
    return resposta





app.run(debug = True)