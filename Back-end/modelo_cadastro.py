from config import * 
# modelos

class Medico(db.Model):

    #Atributos do médico
    id_medico = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    sobrenome = db.Column(db.String(255))
    cpf = db.Column(db.String(11))
    data_nasc = db.Column(db.String(255))
    sexo =  db.Column(db.String(10))

    

    #Expressão da classe em forma de texto
    def __str__(self):
        return f"{self.id_medico}, {self.nome}, {self.sobrenome}, {self.cpf}, {self.data_nasc}, {self.sexo}"

    #Expressao da classe no formato json
    def json(self):
        return{
            "id_medico": self.id_medico,
            "nome": self.nome,
            "sobrenome": self.sobrenome,
            "cpf": self.cpf,
            "data de nascimento": self.data_nasc,
            "sexo": self.sexo
        }


class Paciente(db.Model):
    #Atributos do paciente
    id_paciente = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    sobrenome = db.Column(db.String(255))


    #Essa parte está em comentário para dar uma agilizada na hora de testar, e não ter que botar muitas informações por agora
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

    

    #Método para expressar o paciente em forma de texto
    def __str__(self):
        return f"{self.id_paciente}, {self.nome}, {self.sobrenome}"

    #Expressao da classe no formato json
    def json(self):
        return{
            "id_paciente": self.id_paciente,
            "nome": self.nome,
            "sobrenome": self.sobrenome
        }
        
class MarcarConsulta(db.Model):
    id_consulta = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(255)) # data da consulta
    motivo = db.Column(db.String(255)) # motivo: consulta por dor de cabeça, de barriga(sitomas)

    # atributo de chave estrangeira
    paciente_id_consulta = db.Column(db.Integer, db.ForeignKey(Paciente.id_paciente), nullable=False)
    medico_id_consulta = db.Column(db.Integer, db.ForeignKey(Medico.id_medico), nullable=False)

    # atributo de relacionamento, para acesso aos dados via objeto
    paciente = db.relationship("Paciente")    
    medico = db.relationship("Medico")    

    
    def __str__(self): 
        # expressão da classe em forma de texto
        return f"{self.id_consulta}, {self.data}, {self.motivo}, {self.paciente}, {self.medico} " 

    def strestiloso(self):
        # estiloso
        return f"O paciente {self.paciente.nome} tem uma consulta marcado para o dia \
            {self.data} com o médico {self.medico.nome} devido à {self.motivo}."


    def json(self):
        # expressao da classe no formato json
        return {
            "id": self.id_consulta,
            "data": self.data,
            "motivo": self.motivo,
            "paciente_id_consulta": self.paciente_id_consulta,
            "paciente": self.paciente.json(),
            "medico_id_consulta": self.medico_id_consulta,
            "medico": self.medico.json()
        }


#Testes das classes
if __name__ == "__main__":
    #Apaga o arquivo .bd, se houver
    if os.path.exists(arquivobd):
        os.remove(arquivobd)
    
    #Cria as tabelas
    db.create_all()

    #Teste da classe Paciente
    paciente1 = Paciente(nome = "Carlos", sobrenome = "Landeira")
    paciente2 = Paciente(nome = "Gabriel", sobrenome = "Speckart")
    paciente3 = Paciente(nome = "Benlove", sobrenome = "Anelus")
    
    #Persistir
    db.session.add(paciente1)
    db.session.add(paciente2)
    db.session.add(paciente3)
    db.session.commit()

    """
    pacientes = db.session.query(Paciente).all()
    for paciente in pacientes:
        #Exibe o paciente
        print(f"Olá, {paciente.nome}")
        #Exibe o paciente em json
        print(paciente.json())
    """



    #Teste da classe Medico

    medico1 = Medico(nome = "Paulo Cesar", sobrenome = "McCartney", cpf = "012.546.213-10", data_nasc = "12/09/1974", sexo = "Masculino")
    medico2 = Medico(nome = "João Barra", sobrenome = "Lennon", cpf = "845.685.489-95", data_nasc = "26/07/1968", sexo = "Masculino")
    medico3 = Medico(nome = "Jorge Santos", sobrenome = "Harrison", cpf = "365.781.259.58", data_nasc = "08/04/1984", sexo = "Masculino")
    
    #Persistir
    db.session.add(medico1)
    db.session.add(medico2)
    db.session.add(medico3)
    db.session.commit()



    # teste da classe MarcarConsulta

    consulta1 = MarcarConsulta(data="04/08/2021", motivo= "dor no ouvido esquerdo", paciente=paciente1, medico=medico1)
    consulta2 = MarcarConsulta(data="06/09/2021", motivo="dor no joelho", paciente=paciente1, medico=medico2)
    consulta3 = MarcarConsulta(data="07/10/2021", motivo="dor nas costas", paciente=paciente2, medico=medico3)

    #Persistir
    db.session.add(consulta1)
    db.session.add(consulta2)
    db.session.add(consulta3)
    db.session.commit()

    # prints
    """
    print(paciente1)
    print(medico2)
    """
    print(consulta1)
    print(consulta2)
    print(consulta3)
    
    print(f"\nDetalhado: {consulta2.strestiloso()}")
    print(f"\nDetalhado: {consulta1.strestiloso()}")
    print(f"\nDetalhado: {consulta3.strestiloso()}")