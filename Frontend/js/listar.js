function testelistar(){
    alert("listar funcionando");
}

// todos os pacientes
var id_paciente = document.location.search.replace(/^.*?\=/,'');

function listarPacientes() {
    let link_backend = "http://localhost:5000/";


    $.ajax({
        url: link_backend+'listar_pacientes',
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
        linhass = "Alguma coisa"

        //


        for (var paciente in pacientes) {
            if (pacientes[paciente].nome === 'Carlos'){
                //if (pacientes[paciente].nome === 'nomeclicado'){
                console.log(pacientes[paciente].nome);    
            }
           
           
            
            //var link = pacientes[paciente].nome;

            lin = "<tr>" + 
                    
                    "<td> <a href='../html/paciente.html?id_paciente="+pacientes[paciente].id_paciente+"'>"+ pacientes[paciente].nome + "</td>" + 
                    //"<td> <a href='../html/paciente.html#historico-consulta"+ pacientes[paciente].nome + "</td>" + "</a>"+ 
                    "<td>" + pacientes[paciente].sobrenome+ "</td>" + 
                    "<td>" + pacientes[paciente].id_paciente+ "</td>" + 
                    
                "</tr>"
            

            //
            linhas = linhas + lin;
        }

            //colocar as linhas na tabela
            $("#corpoTabelaPacientes").html(linhas);

            $("#htmls").html(linhass)

            // exibir a tabela
           // $("#conteudoInicial").addClass("invisible");
            
        }


    };












// listar dados do paciente
function listarDadosPaciente(){
    $.ajax({
        url: link_backend+ 'listar_paciente/'+id_paciente,
        method: "GET",
        dataType: "json",
        success: listar_paciente,

        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend ");
        }



    });
    //if (Status === 444){}
}


/*---------------------------------*/
function listar_paciente(paciente){
    $("#nome-paciente").text(paciente.nome + " "+paciente.sobrenome) 
    
    console.log(paciente.nome);
    linha =     '<tr>'+
                /*"<td>" + paciente.id_paciente+ "</td>" + */
                "<td>" + paciente.nome+ "</td>" + 
                "<td>" + paciente.sobrenome+ "</td>" + 
                

                /*"<td>" + paciente.cpf+ "</td>" + 
                "<td>" + paciente.data_nasc+ "</td>" + 
                "<td>" + paciente.sexo+ "</td>" + 
                "<td>" + paciente.e_civil+ "</td>" + 
                "<td>" + paciente.cns+ "</td>" + 
                "<td>" + paciente.cep+ "</td>" + 
                "<td>" + paciente.logradouro+ "</td>" + 
                "<td>" + paciente.numero+ "</td>" + 
                "<td>" + paciente.bairro+ "</td>" + 
                "<td>" + paciente.cidade+ "</td>" + 
                "<td>" + paciente.estado+ "</td>" + 
                "<td>" + paciente.telefone1+ "</td>" + 
                "<td>" + paciente.telefone2+ "</td>" + 
                "<td>" + paciente.email+ "</td>" + 
                "<td>" + paciente.usuario+ "</td>" + 
                "<td>" + paciente.senha+ "</td>" + 

            '</tr>'

    linha2 =
              '<thead>'+
                '<tr>'+
                  '<th scope="col">Nome</th>'+
                  '<th scope="col">Sobrenome</th>'+
                  '<th scope="col">CPF</th>'+
                '</tr>'+
                '<tr>'+
                  '<th scope="col">Data de nascimento</th>'+
                  '<th scope="col">Sexo</th>'+
                  '<th scope="col"Estado Civil</th>'+
                '</tr>'+
              '</thead>'+
              
              '<tbody id="corpoDados">'+
                  
              '</tbody>'*/
          


    
    
    $("#corpoDados").html(linha);
    //$("#tabelaPacientes").html(linha);

}



//listar consultas do paciente
function listarDadosConsulta(){
    $.ajax({
        url: link_backend+ 'listar_consulta/'+id_paciente,
        method: "GET",
        dataType: "json",
        success: listar_consultas_paciente,

        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend");
        }



    });
    //if (Status === 444){}
}



/*---------------------------------*/

function listar_consultas_paciente(consultas) {
    //$("#nome-consultas").text(consultas.nome + " "+consultas.sobrenome) 
    
    console.log(consultas.dataConsulta);

    console.log("AAAAAA",consultas.dataConsulta)
    

    for (var i in consultas){
        console.log("consulta: ", consultas[i].id_consulta);
        
        lin =   "<tr id= 'tr_Consulta" +  consultas[i].id_consulta+"' >" + 
                    "<td>" + consultas[i].dataConsulta+ "</td>" + 
                    "<td>" + consultas[i].medico.nome+ "</td>" + 
                    "<td>" + consultas[i].motivo+ "</td>" + 

                    // btn btn-primary btn-sm rounded-0 - edit/remarcar class
                    // btn btn-danger btn-sm rounded-0 - delet/desmarcar class
                    
                    "<td>"+                             
                        '<ul class="list-inline m-0">'+
                            '<li class="list-inline-item">'+
                              '<button class="" data-toggle="modal" data-target="#modalConsultaRemarcar"  type="button" data-toggle="tooltip" data-placement="top" title="Remarcar"  onclick="chamarModalConsultaRemarcar('+consultas[i].id_consulta+ '), MedicosParaSelecionar() ; ">'+
                              '<i class="fa fa-edit"></i></button>'+
                            '</li>'+
                            
                            '<li class="list-inline-item">'+
                              '<button class="" data-toggle="modal" data-target="#modalConsultaDelete"  type="button" data-toggle="tooltip" data-placement="top" title="Desmarcar" onclick="chamarModalConsultaDelete('+consultas[i].id_consulta+ '); ">'+
                              '<i class="fa fa-trash"></i></button>'+
                            '</li>'+
                            
                        '</ul>'+
                    "</td>"+
                    
                "</tr>"
                 
                
        $("#corpoConsulta").append(lin)
    }
        

}


//listar exames do paciente
function listarDadosExame(){



    $.ajax({
        url: link_backend+ 'listar_exames_paciente/'+id_paciente,
        method: "GET",
        dataType: "json",
        success: listar_exames_paciente,

        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend");
        }



    });
    //if (Status === 444){}
}



function listar_exames_paciente(exames) {

    for (var i in exames){
        console.log("so much pain", exames[i]);
        
        lin =   "<tr id= 'tr_Exame" +  exames[i].id_exame+"' >" + 
                    "<td>" + exames[i].dataExame+ "</td>" + 
                    "<td>" + exames[i].consulta.medico.nome+ "</td>" + 
                    "<td>" + exames[i].tipoExame+ "</td>" + 
                    "<td>" + exames[i].resultadoExame+ "</td>" + 
                    "<td>" + exames[i].consulta.dataConsulta+ "</td>" + 

                    // btn btn-primary btn-sm rounded-0 - edit/remarcar class
                    // btn btn-danger btn-sm rounded-0 - delet/desmarcar class
                    
                    "<td>"+                             
                        '<ul class="list-inline m-0">'+
                            '<li class="list-inline-item">'+
                              '<button class="" data-toggle="modal" data-target="#modalExameRemarcar"  type="button" data-toggle="tooltip" data-placement="top" title="Remarcar"  onclick="chamarModalExameRemarcar('+exames[i].id_exame+ '), dataConsultaParaSelecionar(), MedicosParaSelecionar(); ">'+
                              '<i class="fa fa-edit"></i></button>'+
                            '</li>'+
                            
                            '<li class="list-inline-item">'+
                              '<button class="" data-toggle="modal" data-target="#modalExameDelete"  type="button" data-toggle="tooltip" data-placement="top" title="Desmarcar" onclick="chamarModalExameDelete('+exames[i].id_exame+ '); ">'+
                              '<i class="fa fa-trash"></i></button>'+
                            '</li>'+
                            
                        '</ul>'+
                    "</td>"+

                "</tr>"
                 
                
        $("#corpoExame").append(lin)
    }
        

}






/*---------------------------------*/
function MedicosParaSelecionar() {
    

    $.ajax({
        url: link_backend+ 'listar_medicos',
        method: 'GET',
        dataType: 'json',
        success: medicos_select,
        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend");}
    });


    function medicos_select(medicos){
        for (var medico in medicos) {
            //opt = "<option>" + medicos[medico].sobrenome+ "</option>";
            opt = "<option value= '" + medicos[medico].id_medico+"'>"+ medicos[medico].nome + "</option>";
            console.log(opt);

            $("#selectMedico").append(opt);
            $("#selectMedicoRemarcar").append(opt);
            $("#selectMedicoSolicitante").append(opt);
            $("#selectMedicoSolicitanteRemarcar").append(opt);
        }

    }


};


function dataConsultaParaSelecionar() {
    

    $.ajax({
        url: link_backend+ 'listar_consultas',
        method: 'GET',
        dataType: 'json',
        success: function(datas){
            for (var i in datas){
                opt = "<option value= '" + datas[i].id_consulta+"'>"+ datas[i].dataConsulta + "</option>";
                $("#dataSolicitacao").append(opt);
                $("#dataSolicitacaoRemarcar").append(opt);
            }


        },
        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend");}
    });


};
