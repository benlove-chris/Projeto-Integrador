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

		//

		for (var i in pacientes) {
			//
			lin = "<tr>" + 
			"<td>" + pacientes[i].nome + "</td>" +
			"<td>" + pacientes[i].sobrenome + "</td>" +
			"</tr>";

			//
			linhas = linhas + lin;
		}

			//colocar as linhas na tabela
			$("#corpoTabelaPacientes").html(linhas);

			$("#tabelaPlantas").addClass("invisible");

            // exibir a tabela
            $("#tabelaPlantas").removeClass("invisible");

			

	            // exibir a tabela
	        
		}


	});
