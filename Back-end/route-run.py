from config import *
from modelo_cadastro import Paciente

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



#incluir/cadastrar
@app.route("/cadastrar_paciente", methods=['POST'])

def cadastrar_paciente():
    dados = request.get_json()
    novo_paciente = Paciente(**dados)
    db.session.add(novo_paciente)
    db.session.commit()

    return {"resultado":'ok'}


app.run(debug = True)