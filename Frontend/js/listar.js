

var id_paciente = document.location.search.replace(/^.*?\=/,'');

// todos os pacientes - funcão para adm
function listarPacientes() {
    


    $.ajax({
        url: link_backend+'listar/Paciente',
        method: 'GET',
        dataType: 'json',
        success: listar_pacientes,
        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend");}
    });


    function listar_pacientes(pacientes){
        
        linhas = ""
        for (var paciente in pacientes) {

            lin = "<tr>" + 
                    
                    "<td> <a href='../html/paciente.html?id_paciente="+pacientes[paciente].id_paciente+"'>"+ pacientes[paciente].nome + "</td>" +                 
                    "<td>" + pacientes[paciente].sobrenome+ "</td>" +     
            
                "</tr>"
            
            linhas = linhas + lin;
        }

            //colocar as linhas na tabela
            $("#corpoTabelaPacientes").html(linhas);
            
        }

    };


// todos os pacientes - funcão para adm
function listarMedicos() {
    


    $.ajax({
        url: link_backend+'listar/Medico',
        method: 'GET',
        dataType: 'json',
        success: listar_medicos,
        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend");}
    });


    function listar_medicos(medicos){
        
        linhas2 = ""
        for (var i in medicos) {

            lin = "<tr>" + 
                    
                    "<td>" + medicos[i].nome+ "</td>" +     
                    "<td>" + medicos[i].sobrenome+ "</td>" +     
            
                "</tr>"
            
            linhas2 = linhas2 + lin;
        }

            //colocar as linhas na tabela
            $("#corpoTabelaMedicos").html(linhas2);
            
        }

    };

// listar dados de um paciente 
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
    linha =                 
            '<thead class="bg-secondary">'+
                             '<tr>'+
                                '<th scope="col">Nome</th>'+
                                '<th scope="col">Sobrenome</th>'+
                                '<th scope="col">CPF</th>'+
                             '</tr>'+
            '</thead>'+

            '<tbody>'+
                '<tr>'+
                    "<td>" + paciente.nome+ "</td>" + 
                    "<td>" + paciente.sobrenome+ "</td>" + 
                    "<td>" + paciente.cpf+ "</td>" + 
                '</tr>'+
            '</tbody>'+
            

            '<thead class="bg-secondary">'+
                     '<tr>'+
                        '<th scope="col">Data de Nascimento</th>'+
                        '<th scope="col">Sexo</th>'+
                        '<th scope="col">Estado civil</th>'+
                     '</tr>'+
            '</thead>'+

            '<tbody>'+
                '<tr>'+
                    "<td>" + paciente.data_nasc+ "</td>" + 
                    "<td>" + paciente.sexo+ "</td>" + 
                    "<td>" + paciente.e_civil+ "</td>" + 
                '</tr>'+                
            '</tbody>'+

            '<thead class="bg-secondary">'+
                     '<tr>'+
                        '<th scope="col">CNS</th>'+
                        '<th scope="col">CEP</th>'+
                        '<th scope="col">Logradouro</th>'+
                     '</tr>'+
            '</thead>'+

            '<tbody>'+
                '<tr>'+
                "<td>" + paciente.cns+ "</td>" + 
                "<td>" + paciente.cep+ "</td>" + 
                "<td>" + paciente.logradouro+ "</td>" + 
                '</tr>'+

            '</tbody>'+

            '<thead class="bg-secondary">'+
                     '<tr>'+
                        '<th scope="col">Numero</th>'+
                        '<th scope="col">Bairro</th>'+
                        '<th scope="col">Cidade</th>'+
                     '</tr>'+
            '</thead>'+

            '<tbody>'+

                '<tr>'+
                    "<td>" + paciente.numero+ "</td>" + 
                    "<td>" + paciente.bairro+ "</td>" + 
                    "<td>" + paciente.cidade+ "</td>" + 
            '</tbody>'+

            '<thead class="bg-secondary">'+
                         '<tr>'+
                            '<th scope="col">Estado</th>'+
                            '<th scope="col">Telefone 1</th>'+
                            '<th scope="col">Telefone 2</th>'+
                         '</tr>'+
            '</thead>'+

            '<tbody>'+
                '<tr>'+
                    "<td>" + paciente.estado+ "</td>" + 
                    "<td>" + paciente.telefone1+ "</td>" + 
                    "<td>" + paciente.telefone2+ "</td>" + 
                    '</tr>'+            
            '</tbody>'+

            '<thead class="bg-secondary">'+
                     '<tr>'+
                        '<th scope="col" colspan="2">Email</th>'+
                        '<th scope="col">Usuario</th>'+
                     '</tr>'+
            '</thead>'+

            '<tbody>'+

                '<tr>'+
                    "<td colspan='2'>" + paciente.email+ "</td>" + 
                    "<td>" + paciente.usuario+ "</td>" + 
                '</tr>'+
            '</tbody>'


    
    
    $("#tabelaPacientes").html(linha);
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
    
    

    for (var i in consultas){
        lin =   "<tr id= 'tr_Consulta" +  consultas[i].id_consulta+"' >" + 
                    "<td>" + consultas[i].dataConsulta+ "</td>" + 
                    "<td>" + consultas[i].medico.nome+ "</td>" + 
                    "<td>" + consultas[i].motivo+ "</td>" + 

                    // btn btn-primary btn-sm rounded-0 - edit/remarcar class
                    // btn btn-danger btn-sm rounded-0 - delet/desmarcar class
                    
                    "<td>"+                             
                        '<ul class="list-inline m-0">'+
                            '<li class="list-inline-item">'+
                              '<button class="" data-toggle="modal" data-target="#modalConsultaRemarcar"  type="button" data-toggle="tooltip" data-placement="top" title="Remarcar"  onclick="chamarModalConsultaRemarcar('+consultas[i].id_consulta+ '); ">'+
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
    
        
        lin =   "<tr id= 'tr_Exame" +  exames[i].id_exame+"' >" + 
                    "<td>" + exames[i].dataExame+ "</td>" + 
                    "<td>" + exames[i].consulta.medico.nome+ "</td>" + 
                    "<td>" + exames[i].tipoExame+ "</td>" + 
                    "<td>" + exames[i].resultadoExame+ "</td>" + 
                    "<td>" + exames[i].consulta.dataConsulta+ "</td>" + 

        
                    
                    "<td>"+                             
                        '<ul class="list-inline m-0">'+
                            '<li class="list-inline-item">'+
                              '<button class="" data-toggle="modal" data-target="#modalExameRemarcar"  type="button" data-toggle="tooltip" data-placement="top" title="Remarcar"  onclick="chamarModalExameRemarcar('+exames[i].id_exame+ ');">'+
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
        url: link_backend+ 'listar/Medico',
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
        url: link_backend+ 'listar/Consulta',
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
