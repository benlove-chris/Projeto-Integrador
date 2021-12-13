//validação simples/demonstração
let link_backend = "http://pychris.pythonanywhere.com/";

function logarPaciente(){
    usuario = $("#usuario").val();
    senha = $("#senha").val();

	if (usuario == "sol que ja era") {
        window.location.href = 'html/cadastrados.html';

    }

    else{
    var dados = JSON.stringify({usuario: usuario, senha: senha});
    
    
    
      
    
    $.ajax({
            url : link_backend +'/logarpaciente',
            type : 'POST',
            contentType : 'application/json', // enviando dados em json
            dataType: 'json',
            data: dados,
            success: loginEfetuado,
        error: errologinEfetuado
    });






    function loginEfetuado(resposta){
        let paciente_id_login = resposta.paciente_id;
        if (resposta.resultado == "OK") {
            window.location.href = 'html/paciente.html?id_paciente=' +paciente_id_login ;
            
            
        } else{
            document.getElementById('mensagem').style.display = 'block';
            $("#usuario").val("");
            $("#senha").val("");

        }
        
    
    }

    function errologinEfetuado(resposta){
        document.getElementById('mensagem').style.display = 'block';
        $("#usuario").val("");
        $("#senha").val("");
    }

        
    }

}