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




function listar_consulta(paciente) {
    //$("#nome-paciente").text(paciente.nome + " "+paciente.sobrenome) 
    
    console.log(paciente.data);
    linhas = ""
    //console.log(consultas);

    for (var consulta in paciente){
        console.log(paciente[consulta].data);
        //console.log(consulta.data);
        lin =   '<tr>'+
                    "<td>" + paciente[consulta].data+ "</td>" + 
                    "<td>" + paciente[consulta].medico.nome+ "</td>" + 
                    "<td>" + paciente[consulta].motivo+ "</td>" + 
                '</tr>'

        linhas += lin;
    }
    
    
    $("#corpoConsulta").html(linhas);

}












