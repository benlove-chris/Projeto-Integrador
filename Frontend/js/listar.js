// todos os pacientes
function listarPacientes() {


    $.ajax({
        url: 'http://localhost:5000/listar_pacientes',
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
    //alert("especifica");
    let id_paciente = document.location.search.replace(/^.*?\=/,'');
    $.ajax({
        url: 'http://localhost:5000/listar_paciente/'+id_paciente,
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
                "<td>" + paciente.nome+ "</td>" + 
                "<td>" + paciente.sobrenome+ "</td>" + 
                "<td>" + paciente.id_paciente+ "</td>" + 
            '</tr>'
    
    
    $("#corpoDados").html(linha);

}


//lista dados da consulta do paciente
function listarDadosConsulta(){
    let id_paciente = document.location.search.replace(/^.*?\=/,'');
    $.ajax({
        url: 'http://localhost:5000/listar_consulta/'+id_paciente,
        method: "GET",
        dataType: "json",
        success: listar_consulta,

        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend");
        }



    });
    //if (Status === 444){}
}



/*---------------------------------*/

function listar_consulta(paciente) {
    //$("#nome-paciente").text(paciente.nome + " "+paciente.sobrenome) 
    
    console.log(paciente.data);

    console.log("AAAAAA",paciente.data)
    

    for (var consulta in paciente){
        console.log("consulta: ", paciente[consulta].id_consulta);
        
        lin =   "<tr id= 'tr_Consulta" +  paciente[consulta].id_consulta+"' >" + 
                    "<td>" + paciente[consulta].data+ "</td>" + 
                    "<td>" + paciente[consulta].medico.nome+ "</td>" + 
                    "<td>" + paciente[consulta].motivo+ "</td>" + 

                    // btn btn-primary btn-sm rounded-0 - edit/remarcar class
                    // btn btn-danger btn-sm rounded-0 - delet/desmarcar class
                    
                    "<td>"+                             
                        '<ul class="list-inline m-0">'+
                            '<li class="list-inline-item">'+
                              '<button class="" data-toggle="modal" data-target="#modalConsultaRemarcar"  type="button" data-toggle="tooltip" data-placement="top" title="Remarcar"  onclick="chamarModalConsultaRemarcar('+paciente[consulta].id_consulta+ '), MedicosParaSelecionar() ; ">'+
                              '<i class="fa fa-edit"></i></button>'+
                            '</li>'+
                            
                            '<li class="list-inline-item">'+
                              '<button class="" data-toggle="modal" data-target="#modalConsultaDelete"  type="button" data-toggle="tooltip" data-placement="top" title="Desmarcar" onclick="chamarModalConsultaDelete('+paciente[consulta].id_consulta+ '); ">'+
                              '<i class="fa fa-trash"></i></button>'+
                            '</li>'+
                            
                        '</ul>'+
                    "</td>"+
                    
                "</tr>"
                 
                
        $("#corpoConsulta").append(lin)
    }
        

}






/*---------------------------------*/
function MedicosParaSelecionar() {
    

    $.ajax({
        url: 'http://localhost:5000/listar_medicos',
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

            $("#selectMedico").append(opt)
            $("#selectMedicoRemarcar").append(opt)
        }

    }


};


