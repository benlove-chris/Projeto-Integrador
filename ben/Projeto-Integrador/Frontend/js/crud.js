
//cadastrar paciente
let link_backend = "http://localhost:5000/";

function cadastrarPaciente(){
    
    //obter dados do formulario
    nome = $("#nome").val();
    sobrenome = $("#sobrenome").val();

    cpf = $("#cpf").val();
    data_nasc = $("#data_nasc").val();
    sexo = $("#sexo").val();
    e_civil = $("#e_civil").val();
    cns = $("#cns").val();
    cep = $("#cep").val();
    logradouro = $("#logradouro").val();
    numero = $("#numero").val();
    bairro = $("#bairro").val();
    cidade = $("#cidade").val();
    estado = $("#estado").val();
    telefone1 = $("#telefone1").val();
    telefone2 = $("#telefone2").val();
    email = $("#email").val();
    usuario = $("#usuario").val();
    senha = $("#senha").val();



    //json - preparar para envio
    dados = JSON.stringify({nome: nome, sobrenome: sobrenome, cpf: cpf,
     data_nasc: data_nasc, sexo: sexo, e_civil: e_civil, cns: cns, cep: cep, 
     logradouro: logradouro, numero: numero, bairro: bairro, cidade: cidade, 
     estado: estado, telefone1: telefone1, telefone2: telefone2, 
     email: email, usuario: usuario, senha: senha}); 



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

//?



//Remarcar consulta <>

function chamarModalConsultaRemarcar(id_consulta){
    
    $("#btnRemarcarConsulta").attr('onClick', ("remarcarConsulta('"+id_consulta+"')"));
    $.ajax({
        url: link_backend +'/listar_consulta_esp/'+id_consulta,
        method: "GET",
        dataType: "json",
        success: function(resposta){
            let i_m_c = resposta.medico.id_medico;
            $("#motivoConsultaRemarcar").val(resposta.motivo);
            $("#dataConsultaRemarcar").val(resposta.data); //data
            $('#selectMedicoRemarcar option').removeAttr('selected').filter("[value="+i_m_c+"]").attr('selected', true);
            //$("#selectMedicoRemarcar option").removeAttr('selected').filter('[value=2]').attr('selected', true);    
        },

        error: function(){
            alert("Erro ao receber os dados da consulta :) \nverifique o backend!");
        }
    })
    
}



function remarcarConsulta(id_consulta) {
    
    //editar
    let novo_motivo = $("#motivoConsultaRemarcar").val();
    let nova_data =  $("#dataConsultaRemarcar").val();
    let novo_medico = $("#selectMedicoRemarcar").val();
        
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
        //alert("Sem sucesso");
        alert("Erro ao receber os dados da consulta :) \nverifique o backend!");

        //alert("Erro na comunicação  - resposta not ok com o backend\nAo enviar os dados\nou ao receber os dados");
    };

}

//Remarcar consulta </>





//Remarcar exame <>
function chamarModalExameRemarcar(id_exame){

    aquiiiiiiiiii
    
    $("#btnRemarcarExame").attr('onClick', ("remarcarExame('"+id_exame+"')"));
    $.ajax({
        url: link_backend +'/listar_consulta_esp/'+id_consulta,
        method: "GET",
        dataType: "json",
        success: function(resposta){
            let i_m_c = resposta.medico.id_medico;
            $("#motivoConsultaRemarcar").val(resposta.motivo);
            $("#dataConsultaRemarcar").val(resposta.data); //data
            $('#selectMedicoRemarcar option').removeAttr('selected').filter("[value="+i_m_c+"]").attr('selected', true);
            //$("#selectMedicoRemarcar option").removeAttr('selected').filter('[value=2]').attr('selected', true);    
        },

        error: function(){
            alert("Erro ao receber os dados da consulta :) \nverifique o backend!");
        }
    })
    
}



function remarcarConsulta(id_consulta) {
    
    //editar
    
    
    let dataExameRemarcar = $("#dataExameRemarcar").val();
    let selectMedicoSolicitanteRemarcar = $("#selectMedicoSolicitanteRemarcar").val();
    let tipoExameRemarcar = $("#tipoExameRemarcar").val();
    let resultadoExameRemarcar = $("#resultadoExameRemarcar").val();
    let dataSolicitacaoRemarcar = $("#dataSolicitacaoRemarcar").val();

    var dados = JSON.stringify({dataExameRemarcar: dataExameRemarcar, selectMedicoSolicitanteRemarcar: selectMedicoSolicitanteRemarcar,
    tipoExameRemarcar: tipoExameRemarcar, resultadoExameRemarcar: resultadoExameRemarcar,
    dataSolicitacaoRemarcar: dataSolicitacaoRemarcar});
        
    
   

    $.ajax({
        url: link_backend +'/remarcar_exame/'+id_exame,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: dados,
        success: exameRemarcada,
        error: erroExameRemarcada
    });

    function exameRemarcada(retorno){
        
        if (retorno.resultado == "ok"){
            alert("Exame remarcada com sucesso!");

        }else{
            alert(retorno.resultado+ ":"+retorno.detalhes);
        }
    };


    function erroExameRemarcada(retorno){
        //mensagem de erro 
        //alert("Sem sucesso");
        alert("Erro ao receber os dados da consulta :) \nverifique o backend!");

        //alert("Erro na comunicação  - resposta not ok com o backend\nAo enviar os dados\nou ao receber os dados");
    };

}

//Remarcar exame </>









///////////////////////////////////////////////////////////////////////////////////////////////////////
// para resolver 
function editpaciente_talvez() {
    
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





function testecrud(){
    //alert("crud funcionando");

    nome = $("#nome").val();
    sobrenome = $("#sobrenome").val();
    crm = $("#crm").val();

    dados = JSON.stringify({nome: nome, sobrenome: sobrenome, crm: crm});
    alert(dados);
    console.log(dados);

}








