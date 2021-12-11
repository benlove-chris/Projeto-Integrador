from config import * 
# modelos

class Medico(db.Model):

    #Atributos do médico
    id_medico = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(55), nullable=False)
    sobrenome = db.Column(db.String(55))
    crm = db.Column(db.String(24), nullable=False, unique=True) #unique
    

    #t1 = Column(db.String(80), unique=True, )

    #Expressão da classe em forma de texto
    def __str__(self):
        return f"{self.id_medico}, {self.nome}, {self.sobrenome}, {self.crm}"

    #Expressao da classe no formato json
    def json(self):
        return{
            "id_medico": self.id_medico,
            "nome": self.nome,
            "sobrenome": self.sobrenome,
            "crm": self.crm
        }


class Paciente(db.Model):
    #Atributos do paciente
    id_paciente = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    sobrenome = db.Column(db.String(255))
    cpf = db.Column(db.String(11), nullable=False, unique=True) #unique
    data_nasc = db.Column(db.String(255))
    sexo =  db.Column(db.String(10))
    e_civil = db.Column(db.String(50))
    cns = db.Column(db.String(255))
    
    #Endereço 
    cep =  db.Column(db.String(50))
    logradouro =  db.Column(db.String(255))
    numero = db.Column(db.String(5))
    bairro = db.Column(db.String(55))
    cidade = db.Column(db.String(100))
    estado = db.Column(db.String(30))

    #contato
    telefone1 = db.Column(db.String(255))
    telefone2 = db.Column(db.String(255))
    email = db.Column(db.String(255), nullable=False, unique=True) #unique
    

    #login
    usuario = db.Column(db.String(255), nullable=False, unique=True)#unique
    senha = db.Column(db.String(255))

    #Método para expressar o paciente em forma de texto
    def __str__(self):
    
        return f"{self.nome}, {self.sobrenome}, {self.cpf}, {self.data_nasc},\
                {self.sexo}, {self.e_civil}, {self.cns}, {self.cep}, {self.logradouro},\
                {self.numero}, {self.bairro}, {self.cidade},{self.estado}, {self.telefone1},\
                    {self.telefone2}, {self.email}, {self.usuario}, {self.senha}"

    #Expressao da classe no formato json
    def json(self):
        return{
            "id_paciente": self.id_paciente,
            "nome": self.nome,
            "sobrenome": self.sobrenome,
            "cpf": self.cpf,
            "data_nasc": self.data_nasc,
            "sexo": self.sexo,
            "e_civil": self.e_civil,
            "cns": self.cns,
            "cep": self.cep,
            "logradouro": self.logradouro,
            "numero": self.numero,
            "bairro": self.bairro,
            "cidade": self.cidade,
            "estado": self.estado,
            "telefone1": self.telefone1,
            "telefone2": self.telefone2,
            "email": self.email,
            "usuario": self.usuario,
            "senha": self.senha
        }
        
class Consulta(db.Model):
    id_consulta = db.Column(db.Integer, primary_key=True)
    dataConsulta = db.Column(db.String(255)) # dataConsulta da consulta
    motivo = db.Column(db.String(255)) # motivo: consulta por dor de cabeça, de barriga(sitomas)

    # atributo de chave estrangeira
    paciente_id_consulta = db.Column(db.Integer, db.ForeignKey(Paciente.id_paciente), nullable=False)
    medico_id_consulta = db.Column(db.Integer, db.ForeignKey(Medico.id_medico), nullable=False)

    # atributo de relacionamento, para acesso aos dados via objeto
    paciente = db.relationship("Paciente", foreign_keys=paciente_id_consulta)    
    medico = db.relationship("Medico", foreign_keys=medico_id_consulta)    

    
    def __str__(self): 
        # expressão da classe em forma de texto
        return f"{self.id_consulta}, {self.dataConsulta}, {self.motivo}, {self.paciente}, {self.medico} " 

    def strestiloso(self):
        # estiloso
        return f"O paciente {self.paciente.nome} tem uma consulta marcado para o dia \
            {self.dataConsulta} com o médico {self.medico.nome} devido à {self.motivo}."


    def json(self):
        # expressao da classe no formato json
        return {
            "id_consulta": self.id_consulta,
            "dataConsulta": self.dataConsulta,
            "motivo": self.motivo,
            "paciente_id_consulta": self.paciente_id_consulta,
            "paciente": self.paciente.json(),
            "medico_id_consulta": self.medico_id_consulta,
            "medico": self.medico.json()
        }


class Exame(db.Model):
    id_exame = db.Column(db.Integer, primary_key=True)
    dataExame = db.Column(db.String(254))
    tipoExame = db.Column(db.String(254))
    
    paciente_id_exame = db.Column(db.Integer, db.ForeignKey(Paciente.id_paciente), nullable=False)
    medico_id_exame = db.Column(db.Integer, db.ForeignKey(Medico.id_medico), nullable=False)
    consulta_id_exame = db.Column(db.Integer, db.ForeignKey(Consulta.id_consulta), nullable=False)
    
    paciente = db.relationship("Paciente", foreign_keys=paciente_id_exame)    
    medico = db.relationship("Medico", foreign_keys=medico_id_exame)    
    consulta = db.relationship("Consulta", foreign_keys=consulta_id_exame)    
    
    resultadoExame = db.Column(db.String(254))

    
    def __str__(self): 
        # expressão da classe em forma de texto
        return f"{self.id_exame}, {self.dataExame}, {self.paciente.nome} {self.paciente.sobrenome},\
        {self.consulta.dataConsulta}, {self.consulta.medico},{self.tipoExame}, {self.resultadoExame}" 




    def json(self):
        # expressao da classe no formato json
        return {
            "id_exame": self.id_exame,
            "dataExame": self.dataExame,
            "tipoExame": self.tipoExame,
            "paciente": self.paciente.json(),
            "medico": self.medico.json(),
            "consulta": self.consulta.json(),
            "resultadoExame": self.resultadoExame
        }
        


def testar():
    #Cria as tabela
    db.create_all()

    
    #Teste da classe Pacient
    paciente3 = Paciente(nome = "Benlove", sobrenome = "Anelus", email="johnnydinheiro@gmail.com", senha = "8956", usuario="2beloved", cpf ="123456789")
    paciente2 = Paciente(nome = "Gabriel", sobrenome = "Speckart", email="espiga@gmail.com", senha = "5421", usuario="espiga", cpf ="1234567894")
    paciente1 = Paciente(nome = "Carlos", sobrenome = "Landeira", email="ferrarigol123@gmail.com", senha = "1234", usuario="carlota", cpf ="1234567895")
    
    #Persistir
    db.session.add(paciente1)
    db.session.add(paciente2)
    db.session.add(paciente3)
    db.session.commit()


    #Teste da classe Medico

    medico1 = Medico(nome = "Paulo Cesar", sobrenome = "McCartney", crm = "123456-78/SC")
    medico2 = Medico(nome = "João Barra", sobrenome = "Lennon", crm = "12345fg6-78/SC")
    medico3 = Medico(nome = "Jorge Santos", sobrenome = "Harrison", crm = "123f45f6-78/SC")
    
    #Persistir
    db.session.add(medico1)
    db.session.add(medico2)
    db.session.add(medico3)
    db.session.commit()



    # teste da classe Consulta

    consulta1 = Consulta(dataConsulta="04/08/2021", motivo= "dor no ouvido esquerdo", paciente=paciente1, medico=medico1)
    consulta2 = Consulta(dataConsulta="06/09/2021", motivo="dor no joelho", paciente=paciente2, medico=medico2)
    consulta3 = Consulta(dataConsulta="07/10/2021", motivo="dor nas costas", paciente=paciente3, medico=medico3)

    #Persistir
    db.session.add(consulta1)
    db.session.add(consulta2)
    db.session.add(consulta3)
    db.session.commit()
    print(f"\nDetalhado: {consulta1.strestiloso()}")
    

    

    #teste marcar exame 
    exame1 = Exame(dataExame="04/08/2021", paciente= paciente1, consulta=consulta1, medico=medico1, tipoExame="Sangue", resultadoExame = "1ML 300Kwh")
    exame2 = Exame(dataExame="04/08/2021", paciente= paciente1, consulta=consulta2, medico=medico2, tipoExame="Sangue",resultadoExame = "1ML 300Kwh")
    db.session.add(exame1)
    db.session.add(exame2)
    
    db.session.commit()
    print(exame1)
    print(exame2)

#Testes das classes
if __name__ == "__main__":
    #Apaga o arquivo .bd, se houver
    if os.path.exists(arquivobd):
        os.remove(arquivobd)
    
    try:
        testar()
            
    except Exception as e:  
        print("Inserção não realizado!\n\nPossivelmente: Uma das colunas já exite ou\
            uma das colunas obrigatórias não foi inserido. \n\nErro:", e)
        

    