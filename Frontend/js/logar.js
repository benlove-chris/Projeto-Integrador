function logarPaciente(){
	email = $("#usuario").val();
    senha = $("#senha").val();
    console.log(email, senha);

	var dados = JSON.stringify({email: email, senha: senha});
    console.log(dados);
    
    //let link_backend = "http://localhost:5000/";
      
	$.ajax({
    
        url : "https://localhost:5000/logarpaciente",
        type: 'GET',
        data: { "email": email, "senha": senha},
        contentType: 'application/json',
        dataType: "json",
        success: loginEfetuado,
        error: errologinEfetuado
	});

  

    
//"<td> <a href='../html/paciente.html?id_paciente="+pacientes[paciente].id_paciente+"'>"+ pacientes[paciente].nome + "</td>" + 

	function loginEfetuado(resposta){
        //alert(resposta.paciente_id);
        let paciente_id_login = resposta.paciente_id;
		if (resposta.resultado == "OK") {
            window.location.href = 'html/paciente.html?id_paciente=' +paciente_id_login ;
            //mensagem            
            //window.location.href = 'paciente.html?id_paciente=1';
            //
            
        } else{
        	//alert(resposta.resultado); //logoff
            document.getElementById('mensagem').style.display = 'block';
            usuario = $("#email").val("");
        }
		
	
    }

    function errologinEfetuado(resposta){
        alert("Erro na comunicação com o backend - login");
    }

}