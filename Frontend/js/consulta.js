
const dadosModal = () =>{
	//alert('funcionado');



		/*
		var dataConsultaDado = document.getElementById('dataConsulta').value;
       	var motivoConsultaDado = document.getElementById('motivoConsulta').value;
       	var paciente_id__consulta = document.getElementById('paciente_id').value;
       	var medico_id__consulta = document.getElementById('medico_id').value;

       	*/

       	var motivoConsultaDado = "dor de dentes";
       	var dataConsultaDado = "30-05-0503";
       	var paciente_id__consulta = 1;
       	var medico_id__consulta = 2;
       	//var medicoExecutante = "Jorge Santos";


		var dados = JSON.stringify({data: dataConsultaDado, motivo: motivoConsultaDado, paciente_id_consulta: paciente_id, medico_id_consulta: medico_id});

		$.ajax({
            url : 'http://localhost:5000/marcar_consulta',
            type : 'POST',
            contentType : 'application/json', // enviando dados em json
            dataType: 'json',
            data: dados,
            success: marcarConsulta,
            error: erroMarcarConsulta
    	});


		function cadastrarPaciente(resposta){
	        if (resposta.resultado == "ok") {
	            //mensagem
	            alert('Consulta marcado com successo!');
	            //
	            
	        } else{
	            alert('erro N1 ');

        }
    	}
	    function erroMarcarConsulta(resposta){
	        alert('erro N2 ');
	    }

    

		
		//var dados = [];

		
		/*$.ajax({
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
    				console.log('paciente==== nome', dados);
    				
    				

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
					paraenviar =JSON.stringify(dados);



					//ajax
					$.ajax({
				            url : 'http://localhost:5000/marcar_consulta',
				            type : 'POST',
				            contentType : 'application/json', // enviando dados em json
				            dataType: 'json',
				            data: paraenviar,
				            success: marcarConsulta,
				            error: erroNConsulta
    				});

					function marcarConsulta(resposta){
				        if (resposta.resultado == "ok") {
				            //mensagem
				            alert('Consulta marcada! ');
				            //
				            
				        } else{
				            alert('erro na comunicação - sem Consulta');

				        }
				    }
				    function erroNConsulta(resposta){
				        alert("Consulta não marcada");
				    }
					




				}



			}
		}*/
    	//MarcarConsulta(data="04/08/2021", motivo= "dor no ouvido esquerdo", paciente=paciente1, medico=medico1)

    	

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




function dadosModal____() {

	var data = '23/12/2321';

	var motivo = 'dor de cortovelo';
    
	//Data	Médico executante	Motivo

    //json - preparar para envio
    dados = JSON.stringify({data: data, motivo: motivo, paciente: 'SSA',
     medico: 'sasa'});

    
    console.log(dados); //{"nome":"Benlove Anelus","sobrenome":"Hernandez"}

    //mandar para o back-end

    $.ajax({
            url : 'http://localhost:5000/marcar_consulta',
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
        alert("Deu ruim");
    }

    }


*/