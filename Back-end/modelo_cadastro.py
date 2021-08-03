from config import * 

class Paciente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    sobrenome = db.Column(db.String(255))
    """
    cpf = db.Column(db.String(11))
    data_nasc = db.Column(db.date(255))?
    sexo =  db.Column(db.String(10))
    e_civil = db.Column(db.String(50))--select
    c_SUS = db.Column(db.String(255))
    
    #Endereço 
    logradouro =  db.Column(db.String(255))
    numero = db.Column(db.String(5))
    cidade = db.Column(db.String(100))
    estado = db.Column(db.String(30))
    """

    def _str_(self):
        return f"{self.id}, {self.nome}, {self.sobrenome}"

    def json(self):
        return{
            "id": self.id,
            "nome": self.nome,
            "sobrenome": self.sobrenome
        }



#teste

if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)
    
    db.create_all()

    paciente1 = Paciente(nome = "Carlos", sobrenome = "Landeira")
    paciente2 = Paciente(nome = "Gabriel", sobrenome = "Speckart")
    paciente3 = Paciente(nome = "Benlove", sobrenome = "Anelus")

    db.session.add(paciente1)
    db.session.add(paciente2)
    db.session.add(paciente3)

    db.session.commit()

    #print
    pacientes = db.session.query(Paciente).all()
    for paciente in pacientes:
        print(f"\nOlá, \n{paciente.nome}")
        print(paciente.json())