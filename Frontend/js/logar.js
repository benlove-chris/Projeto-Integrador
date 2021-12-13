//validação simples/demonstração
let link_backend = "http://benlove.pythonanywhere.com/";

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

$(function() {
    if (document.URL == "https://benlove.pythonanywhere.com/front/") {
        window.location.href = "http://benlove.pythonanywhere.com/front/";
        //location.replace(`https:${location.href.substring(location.protocol.length)}`);

        //window.location.replace("http:www.example.com");
        //url.replace(/^http:\/\//i, 'https://');
        //window.location.replace("http://benlove.pythonanywhere.com/front/html/cadastrados.html");
        //window.location.replace('https://','http://');
    
    } 
});



//https://stackoverflow.com/questions/5491196/rewriting-http-url-to-https-using-regular-expression-and-javascript/5491311