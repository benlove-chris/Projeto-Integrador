
//cadastrar paciente
//let link_backend = "http://localhost:5000/";

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
            url : link_backend +'/cadastrar/Paciente',
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
            document.location.reload(true);

        } else{
            alert('Paciente\nCadastro não realizado!\nVerifique e insira os dados corretamente.');

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
            url : link_backend +'/cadastrar/Medico',
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
            alert('Cadastro não realizado!\nVerifique e insira os dados corretamente.');

        }
    }
    function erroCadastrarMedico(resposta){
        alert("Deu ruim na comunicação com o backend");
    }

    };




// Desmarcar consulta
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
                document.location.reload(true);
                
                
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



// Desmarcar exame

function chamarModalExameDelete(id_exame){

    $("#modalExameDeleteBtn").attr('onClick', ("apagarExame('"+id_exame+"')"));
    


}

function apagarExame(id_exame){    
    
    $.ajax({
        
        url: link_backend +'/desmarcar_exame/'+id_exame,
        type: 'DELETE',
        dataType: 'json', 
        contentType: 'application/json',
        data: JSON.stringify({ id_exame: id_exame}), 
        success: function(retorno){
            if (retorno.resultado == "ok") {
                $("#tr_Exame" + id_exame).fadeOut(600, function(){ 
                alert("Exame desmarcada com sucesso!");
                document.location.reload(true);
                
                
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



//Remarcar consulta <>

function chamarModalConsultaRemarcar(id_consulta){
    
    $("#btnRemarcarConsulta").attr('onClick', ("remarcarConsulta('"+id_consulta+"')"));
    $.ajax({
        url: link_backend +'/listar_consulta_esp/'+id_consulta,
        method: "GET",
        dataType: "json",
        success: function(resposta){
            let id_medico = resposta.medico.id_medico;
            $("#motivoConsultaRemarcar").val(resposta.motivo);
            $("#dataConsultaRemarcar").val(resposta.dataConsulta); //data
            $('#selectMedicoRemarcar option').removeAttr('selected').filter("[value="+id_medico+"]").attr('selected', true);
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
            alert("Consulta remarcada com sucesso!");
            document.location.reload(true);

        }else{
            alert(retorno.resultado+ ":"+retorno.detalhes);
        }
    };


    function erroConsultaRemarcada(retorno){
        //mensagem de erro 
        alert("Erro ao receber os dados da consulta :) \nverifique o backend!");


    };

}

//Remarcar consulta </>




//Remarcar exame <>
function chamarModalExameRemarcar(id_exame){
    
    $("#btnRemarcarExame").attr('onClick', ("remarcarExame('"+id_exame+"')"));
    $.ajax({
        url: link_backend +'/listar_exame_esp/'+id_exame,
        method: "GET",
        dataType: "json",
        success: function(resposta){
            //os valores a ser trocados
            let id_medico = resposta.medico.id_medico; //id do medico
            let id_consulta = resposta.consulta.id_consulta;
            $("#dataConsultaRemarcar").val(resposta.dataExame);
            $("#tipoExameRemarcar").val(resposta.tipoExame);
            $('#selectMedicoSolicitanteRemarcar option').removeAttr('selected').filter("[value="+id_medico+"]").attr('selected', true);
            $("#resultadoExameRemarcar").val(resposta.resultadoExame);
            $('#dataSolicitacaoRemarcar option').removeAttr('selected').filter("[value="+id_consulta+"]").attr('selected', true);
        },

        error: function(){
            alert("Erro ao receber os dados da consulta :) \nverifique o backend!");
        }
    })
    
}



function remarcarExame(id_exame) {
    
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
            document.location.reload(true);

        }else{
            alert(retorno.resultado+ ":"+retorno.detalhes);
        }
    };


    function erroExameRemarcada(retorno){
        //mensagem de erro 

        alert("Erro ao receber os dados da consulta :) \nverifique o backend!");


    };

}

//Remarcar exame </>







