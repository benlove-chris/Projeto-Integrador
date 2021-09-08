
const dadosModal = () =>{

		var dataConsulta = document.getElementById('dataConsulta').value;
       	var motivoConsulta = document.getElementById('motivoConsulta').value;


		var dados = {dataConsulta: dataConsulta, motivoConsulta: motivoConsulta};
		//var dados = [];
		

		$.ajax({
        url: 'http://localhost:5000/listar_medicos',
        method: 'GET',
        dataType: 'json',
        success: preencherMedicos,
        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend");}
    	});		


		$.ajax({
        url: 'http://localhost:5000/listar_pacientes',
        method: 'GET',
        dataType: 'json',
        success: preencherPaciente,
        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend");}
    	});

    	
    	function preencherMedicos(medicos){
    		var medicoExecutante = "Jorge Santos";
			for (var m in medicos){
				console.log(medicos[m].nome)
    			var medico =  (medicos[m].nome);
				dados['medico'] = medico;
			}
		}
    		
    	
		function preencherPaciente(pacientes){
			/*for (var medico in medicos){
				console.log(medicos);
				for (var paciente in pacientes){
					console.log(pacientes);
				}}*/
			//alert(pacientes[1].nome, medicos[1].nome);

			
        				
        		

        	

    		let id_paciente_atual = document.location.search.replace(/^.*?\=/,'');

    		
    		for (var paciente in pacientes){
    			//console.log((pacientes[paciente].id_paciente)+2);
    			
    			if (id_paciente_atual == pacientes[paciente].id_paciente){
    				var paciente =  (pacientes[paciente]);
    				console.log('pacienteee', paciente)
    				//print += paciente;

    				dados['paciente'] = paciente;
    				

    				//var dataConsulta = document.getElementById('dataConsulta').value;
        			//var motivoConsulta = document.getElementById('motivoConsulta').value;
        			
        			



    				

    			}
    		
		    		
    		}

    	}

    		


    	
        console.log(dados);
        //var primeiraParte = dataConsulta: dataConsulta, motivoConsulta:motivoConsulta, paciente = , medico =
        
        //alert("Lorem ipsum");
	
	

}

/*

//consulta1 = MarcarConsulta(data="04/08/2021", motivo= "dor no ouvido esquerdo", paciente=paciente1, medico=medico1)

const marcarConsulta = async(cosulta) => {

	$.ajax({
		url : 'http://localhost:5000/marcar_consulta',
        type : 'POST',
        contentType : 'application/json', // enviando dados em json
        dataType: 'json',
        data: dados,
        success: body: JSON.stringify(dadosModal())
        error: function(){
        	alert("Erro ao ler os dados :) \nverifique o backend 1");
        }


	});

	

}


//{motivoConsulta: "As df asas", dataConsulta: "2001-11-23", medicoExecutante: "assc fgf"}

*/
