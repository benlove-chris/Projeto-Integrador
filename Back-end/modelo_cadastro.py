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
    
    paciente4 = Paciente(nome = "Cris", sobrenome = "John")
    paciente5 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente6 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente7 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente8 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente9 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente10 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente11 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente12 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente13 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente14 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente15 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente16 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente17 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente18 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente19 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    paciente20 = Paciente(nome = "Benlove", sobrenome = "Anelus")


    db.session.add(paciente1)
    db.session.add(paciente2)
    db.session.add(paciente3)

    db.session.add(paciente4)
    db.session.add(paciente5)
    db.session.add(paciente6)
    db.session.add(paciente7)
    db.session.add(paciente8)
    db.session.add(paciente9)
    db.session.add(paciente10)
    db.session.add(paciente11)
    db.session.add(paciente12)
    db.session.add(paciente13)
    db.session.add(paciente14)
    db.session.add(paciente15)
    db.session.add(paciente16)
    db.session.add(paciente17)
    db.session.add(paciente18)
    db.session.add(paciente19)
    db.session.add(paciente20)
    

    db.session.commit()

    #print
    pacientes = db.session.query(Paciente).all()
    for paciente in pacientes:
        print(f"\nOlá, \n{paciente.nome}")
        print(paciente.json())