from flask import Flask, jsonify
import os
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)

caminho = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(caminho, "Pacientes.db")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + arquivobd
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
