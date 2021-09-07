from config import *
from modelo_cadastro import *

@app.route("/")

def inicio():
    return ("Aqui vai uma mensagem de boas vindas (img/outro)")


@app.route("/listar_pacientes", methods=['GET'])

def listar_pacientes():
    pacientes = db.session.query(Paciente).all()
    retorno = []

    for paciente in pacientes:
        retorno.append(paciente.json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

"""
# Rota para pegar os dados de uma sala específica
@geral.route("/dados_sala/<int:id_sala>",  methods=['POST','GET'])
def dados_sala(id_sala):
    
    sala_esp = Sala.query.get_or_404(id_sala)
    
    return (sala_esp.json())
"""

#listar dados de uma pessoas especifica
@app.route("/listar_paciente/<int:id_paciente>", methods=['GET'])

def dados_paciente(id_paciente):
    #dados = Paciente.query.get()
    dados = Paciente.query.get_or_404(id_paciente)
    return (dados.json())

#listar dados de uma pessoas especifica
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
    
    #for d in dados:
        #a.append(d.json())
        
    #return a

#print(dados_consulta(1))


#incluir/cadastrar
@app.route("/cadastrar_paciente", methods=['POST'])

def cadastrar_paciente():
    dados = request.get_json()
    novo_paciente = Paciente(**dados)
    db.session.add(novo_paciente)
    db.session.commit()

    return {"resultado":'ok'}


app.run(debug = True)