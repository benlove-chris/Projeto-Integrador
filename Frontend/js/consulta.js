
function marcarConsulta () {
	//alert('funcionado');



	/*
	var dataConsultaDado = document.getElementById('dataConsulta').value;
   	var motivoConsultaDado = document.getElementById('motivoConsulta').value;
   	var paciente_id__consulta = document.getElementById('paciente_id').value;
   	var medico_id__consulta = document.getElementById('medico_id').value;

   	*/

   	var motivoConsultaDado = "dor de dentes";
   	var dataConsultaDado = "30-05-0503";
   	var paciente_id_consulta = 4;
   	var medico_id_consulta = 2;
   	//var medicoExecutante = "Jorge Santos";


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