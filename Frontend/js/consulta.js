
const dadosModal = () =>{



		//var dataConsultaDado = document.getElementById('dataConsulta').value;
       	//var motivoConsultaDado = document.getElementById('motivoConsulta').value;

       	var motivoConsultaDado = "dor de dentes";
       	var dataConsultaDado = "30/05/0503";
       	//var medicoExecutante = "Jorge Santos";


		var dados = {dataConsulta: dataConsultaDado, motivoConsulta: motivoConsultaDado};
		
		//var dados = [];
		
		$.ajax({
        url: 'http://localhost:5000/listar_pacientes',
        method: 'GET',
        dataType: 'json',
        success: preencherPaciente,
        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend");}
    	});

		$.ajax({
        url: 'http://localhost:5000/listar_medicos',
        method: 'GET',
        dataType: 'json',
        success: preencherMedicos,
        error: function(){
            alert("Erro ao ler os dados :) \nverifique o backend");}
    	});		


    	function preencherPaciente(pacientes){
    		let id_paciente_atual = document.location.search.replace(/^.*?\=/,'');
    		for (var p in pacientes){
    			//console.log((pacientes[paciente].id_paciente)+2);
    			if (id_paciente_atual == pacientes[p].id_paciente){
    				var paciente =  (pacientes[p]);
    				dados['paciente'] =  paciente;
    				console.log('paciente nome', dados.paciente.nome);
    				
    				

    				//var dataConsulta = document.getElementById('dataConsulta').value;
        			//var motivoConsulta = document.getElementById('motivoConsulta').value;
        
    			}
    		
		    		
    		}

    	}



		

    	
    	function preencherMedicos(medicos){

    		var medicoExecutante = "Jorge Santos";
    	
			for (var m in medicos){
				if (medicos[m].nome == "Jorge Santos"){
					console.log(medicos[m].nome)
	    			var medico =  (medicos[m]);
					dados['medico'] = medico;
					return dados
					
				}


			}
		}
    	//MarcarConsulta(data="04/08/2021", motivo= "dor no ouvido esquerdo", paciente=paciente1, medico=medico1)

    	
    	
		


}

console.log("OLA<<<<<", dadosModal());

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
