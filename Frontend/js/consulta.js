
function marcarConsulta () {
	//alert('funcionado');



	
    //entrada
	var dataConsultaDado = document.getElementById('dataConsulta').value;
   	var motivoConsultaDado = document.getElementById('motivoConsulta').value;
   	let paciente_id_consulta = document.location.search.replace(/^.*?\=/,'');
   	//var medico_id_consulta = document.getElementById('medico_id').value;
    var medico_id_consulta = 2;
    
   	
    
    /*
    // para teste
    let paciente_id_consulta = document.location.search.replace(/^.*?\=/,'');
   	var motivoConsultaDado = "dor de dentes";
   	var dataConsultaDado = "30-05-0503";
   	var medico_id_consulta = 2;
    */
    


	var dados = JSON.stringify({data: dataConsultaDado, motivo: motivoConsultaDado, paciente_id_consulta: paciente_id_consulta, medico_id_consulta: medico_id_consulta});

	$.ajax({
        url : 'http://localhost:5000/marcar_consulta',
        type : 'POST',
        contentType : 'application/json', // enviando dados em json
        dataType: 'json',
        data: dados,
        success: consultaMarcado,
        error: erroconsultaMarcado
	});


	function consultaMarcado(resposta){
        if (resposta.resultado == "ok") {
            //mensagem
            alert('Consulta marcado com successo!');
            //
            
        } else{
            alert('erro N1 ');

    }
	}
    function erroconsultaMarcado(resposta){
        alert('erro N2 ');
    }

}