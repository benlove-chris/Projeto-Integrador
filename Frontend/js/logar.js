function logarPaciente(){
	usuario = $("#nomeusuario").val();
	alert(usuario);

	var dados = JSON.stringify({username: usuario});

	$.ajax({
        url : 'http://localhost:5000/login',
        type : 'POST',
        contentType : 'application/json', // enviando dados em json
        dataType: 'json',
        data: dados,
        success: loginEfetuado,
        error: errologinEfetuado
	});


	function loginEfetuado(resposta){
		if (resposta.resultado == "login") {
            //mensagem
            window.location.href = 'paciente.html';
            //
            
        } else{
        	alert(resposta.resultado);
        }
		
	
    }

    function errologinEfetuado(resposta){
        alert("Erro na comunicação com o backend");
    }

}