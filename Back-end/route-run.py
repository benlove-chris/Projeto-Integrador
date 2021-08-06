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
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

#incluir/cadastrar



@app.route("/cadastrar_paciente", methods=['post'])

def cadastrar_paciente():
    dados = request.get_json()
    novo_paciente = Paciente(**dados)
    db.session.add(novo_paciente)
    db.session.commit()

    return {"resultado":'ok'}


app.run(debug = True)