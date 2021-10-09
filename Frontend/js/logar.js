function logarPaciente(){
	usuario = $("#nomeusuario").val();
	alert(usuario);

	//var dados = JSON.stringify({username: usuario});

	$.ajax({
        url : 'http://localhost:5000/logarpaciente/'+usuario,
        type : 'POST',
        contentType : 'application/json', // enviando dados em json
        dataType: 'json',
        //data: dados,
        success: loginEfetuado,
        error: errologinEfetuado
	});

//"<td> <a href='../html/paciente.html?id_paciente="+pacientes[paciente].id_paciente+"'>"+ pacientes[paciente].nome + "</td>" + 

	function loginEfetuado(resposta){
        alert(resposta.resultado);
		if (resposta.resultado == "login") {
            //mensagem
            alert('a');
            //window.location.href = 'paciente.html?id_paciente=1';
            //
            
        } else{
        	alert(resposta.resultado);
        }
		
	
    }

    function errologinEfetuado(resposta){
        alert("Erro na comunicação com o backend");
    }

}