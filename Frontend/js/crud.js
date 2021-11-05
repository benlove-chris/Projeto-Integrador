
//cadastrar paciente
let link_backend = "http://localhost:5000/";

function cadastrarPaciente(){
    
    //obter dados do formulario
    nome = $("#nome").val();
    sobrenome = $("#sobrenome").val();


    //json - preparar para envio
    dados = JSON.stringify({nome: nome, sobrenome: sobrenome});
    console.log(dados) //{"nome":"Benlove Anelus","sobrenome":"Hernandez"}

    //mandar para o back-end -

    $.ajax({
            url : link_backend +'/cadastrar_paciente',
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
            alert('erro na comunicação  - resposta not ok');

        }
    }
    function erroCadastrarPaciente(resposta){
        alert("Deu ruim na comunicação com o backend");
    }

    };


//cadastrar médido


function cadastrarMedico(){
    alert("a");
    //
    //obter dados do formulario
    nome = $("#nome").val();
    sobrenome = $("#sobrenome").val();
    crm = $("#crm").val();



    //json - preparar para envio
    dados = JSON.stringify({nome: nome, sobrenome: sobrenome, crm: crm});
    

    //mandar para o back-end -

    $.ajax({
            url : link_backend +'/cadastrar_medico',
            type : 'POST',
            contentType : 'application/json', // enviando dados em json
            dataType: 'json',
            data: dados,
            success: cadastrarMedico,
            error: erroCadastrarMedico
    });

    function cadastrarMedico(resposta){
        if (resposta.resultado == "ok") {
            //mensagem
            alert('O Medico foi cadastrado com sucesso! ');
            //
            $("#nome").val("");
            $("#sobrenome").val("");
            $("#crm").val("");
        } else{
            alert('erro na comunicação  - resposta not ok - resposta not ok');

        }
    }
    function erroCadastrarMedico(resposta){
        alert("Deu ruim na comunicação com o backend");
    }

    };




/*Apagar*/
function chamarModalConsultaDelete(id_consulta){
    console.log('id_consulta,',id_consulta);
    $("#modalConsultaDeleteBtn").attr('onClick', ("apagarConsulta('"+id_consulta+"')"));
    


}

function apagarConsulta(id_consulta){
    //alert("Apgar")}
    //id_consulta = 5;
    
    
    $.ajax({
        
        url: link_backend +'/desmarcar_consulta/'+id_consulta,
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
                alert("Respect"+retorno.resultado + " : " + retorno.detalhes);
            }
        },
        error: function (error){
            alert("Deu ruim na comunicação com o backend");
        }
    })
};

/*Apagar </> */



/*remarcar - editar */
/*
var dataConsultaDado = document.getElementById('dataConsulta').value;
    var motivoConsultaDado = document.getElementById('motivoConsulta').value;
    let paciente_id_consulta = document.location.search.replace(/^.*?\=/,'');
    var medico_id_consulta = document.getElementById('selectMedico').value;
    */


function chamarModalConsultaRemarcar(id_consulta){
    console.log('id_consulta para remarcar,',id_consulta);

    $("#btnRemarcarConsulta").attr('onClick', ("remarcarConsulta('"+id_consulta+"')"));

    $.ajax({
        url: link_backend +'/listar_consulta_esp/'+id_consulta,
        method: "GET",
        dataType: "json",
        success: function(resposta){
            $("#motivoConsultaRemarcar").val(resposta.motivo);
            //$("#motivoConsultaRemarcar").val(resposta.medico.nome);
            //$("#dataConsultaRemarcar").val(resposta.data); //data
            

            for (var i in resposta){
                console.log("da consulta",i, "==", resposta[i]);
            }

        },
        error: function(){
            alert("Erro ao receber os dados da consulta :) \nverifique o backend!");
        }
    })
    


}



function remarcarConsulta(id_consulta) {
    
    //editar
    novo_motivo = $("#motivoConsultaRemarcar").val();
    nova_data =  $("#dataConsultaRemarcar").val();
    var novo_medico = document.getElementById('selectMedicoRemarcar').value;
    
    //let novo_motivo = "motivo do teste";
    //nova_data =  "data do teste";
    //novo_medico = "Medico testador";
    
    //var dados = JSON.stringify({novo_motivo: novo_motivo});
    
    //var dados = JSON.stringify({novo_motivo: novo_motivo, nova_data: nova_data});
    var dados = JSON.stringify({novo_motivo: novo_motivo, nova_data: nova_data, novo_medico:  novo_medico});
   

    $.ajax({
        url: link_backend +'/remarcar_consulta/'+id_consulta,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: dados,
        success: consultaRemarcada,
        error: erroConsultaRemarcada
    });

    function consultaRemarcada(retorno){
        
        if (retorno.resultado == "ok"){
            alert("Consulta remacada com sucesso!");

        }else{
            alert(retorno.resultado+ ":"+retorno.detalhes);
        }


    };


    function erroConsultaRemarcada(retorno){
        //mensagem de erro 
        alert("Sem sucesso");

        //alert("Erro na comunicação  - resposta not ok com o backend\nAo enviar os dados\nou ao receber os dados");
    };

}










///////////////////////////////////////////////////////////////////////////////////////////////////////
// para resolver
function testar() {
    alert("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    // body...
    novo_nome = "Carlos";
    //novo_sobrenome = "novo";

    var dados = JSON.stringify({novo_nome: novo_nome});

    $.ajax({
        url: link_backend +'/editar_paciente/1',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: dados,
        success: function(){
            alert("Sucesso");
        },
        error: function(){
            alert('error');
        }
    });
}


function xxxxtestar() {
    alert("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    // body...
    
    novo_motivo = "god bless us";

    var dados = JSON.stringify({novo_motivo: novo_motivo});

    $.ajax({
        url: link_backend +'/editar_consulta/1',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: dados,
        success: function(){
            alert("Sucesso");
        },
        error: function(){
            alert('error');
        }
    });
}






