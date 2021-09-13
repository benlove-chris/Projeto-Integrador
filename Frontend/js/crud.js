
//incluir

function cadastrarPaciente(){
 
    //obter dados do formulario
    nome = $("#nome").val();
    sobrenome = $("#sobrenome").val();


    //json - preparar para envio
    dados = JSON.stringify({nome: nome, sobrenome: sobrenome});
    console.log(dados) //{"nome":"Benlove Anelus","sobrenome":"Hernandez"}

    //mandar para o back-end

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
    