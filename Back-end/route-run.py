from config import *
from modelo_cadastro import Paciente

@app.route("/")

def inicio():
    return ("Aqui vai uma mensagem de boas vindas (img/outro)")

@app.route("/listar_pacientes")

def listar_pacientes():
    pacientes = db.session.query(Paciente).all()
    retorno = []

    for paciente in pacientes:
        retorno.append(paciente.json())
    resposta = jsonify(retorno)
    #resposta.headers.add("Access-COntrol-Aloww-Origin", "*")
    return resposta

"""
#incluir - Em contrução
@app.route("/incluir_paciente", methods = ['post'])

def incluir_paciente():
    pass

"""
    
    

app.run(debug = True)