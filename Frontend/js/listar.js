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












// especifica
function listarDadosPaciente(){
    //alert("especifica");
    let id_paciente = document.location.search.replace(/^.*?\=/,'');
    $.ajax({
        url: 'http://localhost:5000/listar_paciente/'+id_paciente,
        method: "GET",
        dataType: "json",
        success: listar_paciente,

        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend 1");
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


//Consulta
function listarDadosConsulta(){
    let id_paciente = document.location.search.replace(/^.*?\=/,'');
    $.ajax({
        url: 'http://localhost:5000/listar_consulta/'+id_paciente,
        method: "GET",
        dataType: "json",
        success: listar_consulta,

        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend 1");
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

                    //"<td>"+ '<button data-toggle="modal" data-target="#modalConsultaDelete" class="btn btn-primary" onclick="chamarModalConsultaDelete('+paciente[consulta].id_consulta+ '); ">Desmarcar <br> Consulta</button>'+"</td>"+
                    //"<td>"+ '<button data-toggle="modal" data-target="#modalConsultaDelete" class="btn btn-primary" onclick="chamarModalConsultaDelete('+paciente[consulta].id_consulta+ '); ">Mudar <br> Consulta</button>'+"</td>"+
                    "<td>"+
                                            
                        '<ul class="list-inline m-0">'+
                            '<li class="list-inline-item">'+
                                '<button class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Add"><i class="fa fa-table"></i></button>'+
                            '</li>'+
                            '<li class="list-inline-item">'+
                              '<button data-toggle="modal" data-target="#modalConsultaDelete" class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onclick="chamarModalConsultaDelete('+paciente[consulta].id_consulta+ '); ">'+
                              '<i class="fa fa-trash"></i></button>'+
                          '</li>'+
                            
                        '</ul>'+
                    "</td>"+
                    
                "</tr>"
                 
                
        $("#corpoConsulta").append(lin)
    }
        

}



function chamarModalConsultaDelete(id_consulta){
    //alert("Tudo fuuncionado");
    
    
    console.log('id_consulta,',id_consulta);
    $("#modalConsultaDeleteBtn").attr('onClick', ("apagarConsulta('"+id_consulta+"')"));
    


}


/*Apagar*/

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
                alert("Consulta marcado com sucesso!");
                
                
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
        }

    }


};



