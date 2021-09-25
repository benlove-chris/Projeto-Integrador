
//cadastrar paciente

function cadastrarPaciente(){
 
    //obter dados do formulario
    nome = $("#nome").val();
    sobrenome = $("#sobrenome").val();


    //json - preparar para envio
    dados = JSON.stringify({nome: nome, sobrenome: sobrenome});
    console.log(dados) //{"nome":"Benlove Anelus","sobrenome":"Hernandez"}

    //mandar para o back-end -

    $.ajax({
            url : 'http://localhost:5000/cadastrar_paciente',
            type : 'POST',
            contentType : 'application/json', // enviando dados em json
            dataType: 'json',
            data: dados,
            success: cadastrarPaciente,
            error: erroCadastrarPaciente
    });

    function cadastrarPaciente(resposta){
        if (resposta.resultado == "ok") {
            //mensagem
            alert('O paciente foi cadastrado com sucesso! ');
            //
            $("#nome").val("");
            $("#sobrenome").val("");
        } else{
            alert('erro na comunicação');

        }
    }
    function erroCadastrarPaciente(resposta){
        alert("Deu ruim");
    }

    };


//cadastrar médido


function cadastrarMedico(){
    //
};




/*Apagar*/

function apagarConsulta(id_consulta){
    //alert("Apgar")}
    //id_consulta = 5;
    
    
    $.ajax({
        
        url: 'http://localhost:5000/desmarcar_consulta/'+id_consulta,
        type: 'DELETE',
        dataType: 'json', contentType: 'application/json',
        data: JSON.stringify({ id_consulta: id_consulta}), 
        success: function(retorno){
            if (retorno.resultado == "ok") {
                $("#tr_Consulta" + id_consulta).fadeOut(600, function(){ 
                alert("Consulta desmarcada com sucesso!");
                
                
            });
            
        }
            else {
                alert(retorno.resultado + " : " + retorno.detalhes);
            }
        },
        error: function (error){
            alert("Ocorreu um erro ao marcar essa consulta!");
        }
    })
};

/*Apagar </> */























