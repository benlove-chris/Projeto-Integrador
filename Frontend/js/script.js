/*
$( document ).ready(function() {
    
    $("#conteudoInicial").removeClass("invisible");

    $("#link_listar_pacientes").click(function(){
        
        $.ajax({
            url: 'http://localhost:5000/listar_pacientes',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar_pacientes, // chama a função listar_pacientes para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar_pacientes(pacientes) {
            // inicializar um acumulador
            linhas = ""
            // percorrer as pacientes retornadas em json
            for (var i in pacientes) {

              // montar uma linha da tabela de pacientes
              lin = "<tr>" + 
              "<td>" + pacientes[i].nome + "</td>" + 
              "<td>" + pacientes[i].sobrenome + "</td>" + 
             
              "</tr>";

              // adicionar a linha da tabela em um acumulador
              linhas = linhas + lin;
            }
            // colocar as linhas na tabela
            $("#corpoTabelaPacientes").html(linhas);

            // esconder todos os elementos da tela
            $("#conteudoInicial").addClass("invisible");
            $("#tabelaPacientes").addClass("invisible");

            // exibir a tabela
            $("#tabelaPacientes").removeClass("invisible");
        }

    });

  });
*/














//Meu js

$("#link_listar_pacientes").click(function(){

	//alert("Oi!")};
	$.ajax({
		url: 'http://localhost:5000/listar_pacientes',
		method: 'GET',
		dataType: 'json',
		success: listar_pacientes,
		error: function(){
			alert("Erro ao ler os dados :) \nverifique o backend");}
	});

	//ccccccccccccccccccccccccccccccccc

	function listar_pacientes(pacientes){
		//
		linhas = ""
        linhass = "Alguma coisa"

		//


		for (var paciente in pacientes) {
            if (pacientes[paciente].nome === 'Carlos'){
                console.log(pacientes[paciente].nome);    
            }
            
			//
            /*
			
            lin = "<tr>" + 
			"<td> " + pacientes[i].nome  + " </td>" +
			"<td>" + pacientes[i].sobrenome + "</td>" +
			"</tr>";

            */
            
            var link = pacientes[paciente].nome;

            lin = "<tr>" + 
                    
                    //"<td> <a href='../html/paciente.html#historico-consulta" + "'>"+ pacientes[paciente].nome + "</td>" + 
                    "<td> <a href='"+link+ "'>"+ pacientes[paciente].nome + "</td>" + 

                    "<td>" + pacientes[paciente].id+ "</td>" + 
                    "<td>" + pacientes[paciente].sobrenome+ "</td>" + 
                    "</a>"
                "</tr>"
            
            /////////////////////////

            /////////////////////////

			//
			linhas = linhas + lin;
		}

			//colocar as linhas na tabela
			$("#corpoTabelaPacientes").html(linhas);

			$("#htmls").html(linhass)

            // exibir a tabela
           // $("#conteudoInicial").addClass("invisible");
            
		}


	});
/*
$("#botao_cadastrar_paciente").click(function()
    {alert("Ola")});

*/
//incluir
$("#botao_cadastrar_paciente").click(function(){
    //obter dados do formulario
    nome = $("#nome").val();
    sobrenome = $("#sobrenome").val();


    //json - preparar para envio
    dados = JSON.stringify({nome: nome, sobrenome: sobrenome});

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

    });
    




