
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
        alert("Deu ruim na comunicação com o backend");
    }

    };


//cadastrar médido


function cadastrarMedico(){
    //
};




/*Apagar*/
function chamarModalConsultaDelete(id_consulta){
    //alert("Tudo fuuncionado");
    console.log('id_consulta,',id_consulta);
    $("#modalConsultaDeleteBtn").attr('onClick', ("apagarConsulta('"+id_consulta+"')"));
    


}

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



/*remarcar - editar */
/*
var dataConsultaDado = document.getElementById('dataConsulta').value;
    var motivoConsultaDado = document.getElementById('motivoConsulta').value;
    let paciente_id_consulta = document.location.search.replace(/^.*?\=/,'');
    var medico_id_consulta = document.getElementById('selectMedico').value;
    */


function chamarModalConsultaRemarcar(id_consulta){
    alert("Tudo fuuncionado");
    console.log('id_consulta para remarcar,',id_consulta);

    $("#btnRemarcarConsulta").attr('onClick', ("remarcarConsulta('"+id_consulta+"')"));

    $.ajax({
        url: 'http://localhost:5000/listar_consulta_esp/'+id_consulta,
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
    /*
    //editar
    novo_motivo = $("#motivoConsultaRemarcar").val();
    nova_data =  $("#dataConsultaRemarcar").val();
    novo_medico = $("#selectMedicoRemarcar").val();
    */
    novo_motivo = "motivo do teste";
    nova_data =  "data do teste";
    novo_medico = "Medico testador";

    var dados = JSON.stringify({novo_motivo: novo_motivo, nova_data: nova_data, novo_medico:  novo_medico});
   

    $.ajax({
        url: 'http://localhost:5000/remarcar_consulta'+id_consulta,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: dados,
        success: consultaRemarcada,
        error: erroConsultaRemarcada
    });

    function consultaRemarcada(retorno){
        alert("Entrei por aqui");
        if (retorno.resultado == "ok"){
            alert("Consulta remacada com sucesso!");

        }else{
            alert(retorno.resultado+ ":"+retorno.detalhes);
        }


    };


    function erroConsultaRemarcada(retorno){
        //mensagem de erro 
        alert("ERRO:" + retorno.resultado + ":" +retorno.detalhes);
    };

}













