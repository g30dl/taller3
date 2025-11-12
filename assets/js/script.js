window.addEventListener("DOMContentLoaded", function(){
	//====================================
	//============ CALCULADORA ===========
	//====================================

	//Declaramos elementos
	const num1 = document.getElementById("num1");
	const num2 = document.getElementById("num2");
	const btnSumar = document.getElementById("btn-sumar");
	const btnRestar = document.getElementById("btn-restar");
	const btnMultiplicar = document.getElementById("btn-multiplicar");
	const btnDividir = document.getElementById("btn-dividir");
	const resultadoCalculadora = document.getElementById("resultado-calculadora");
	
	//Funcion para obtener y validar numeros
	function obtenerNumero(){
		const numero1= parseFloat(num1.value);
		const numero2= parseFloat(num2.value);
		return {numero1, numero2};
		
	}
	
	//validar
	function validar(num1, num2){
		if(isNaN(num1)|| isNaN(num2) || num1.value === "" || num2.value === ""){
			return false;
		}
		return true;
	}
	
	//sumar
	function sumar(a,b){
		return a + b;
	}
	//restar
	function restar(a,b){
		return a - b;
	}
	//multiplicar
	function multiplicar(a,b){
		return a * b;
	}
	//dividir
	function dividir(a,b){
		if(b == 0){
			return null;
		}
		return a / b;
	}
	
	//boton sumar
	btnSumar.addEventListener("click", function(){
		const {numero1, numero2} = obtenerNumero();
		
		if(!validar(numero1, numero2)){
			alert("numeros vacios")
			return;
		}
		
		const resultado = sumar(numero1, numero2);
		resultadoCalculadora.textContent = "El resultado es " + resultado; 
		
	});
	//boton restar
	btnRestar.addEventListener("click", function(){
		const {numero1, numero2} = obtenerNumero();
		
		if(!validar(numero1, numero2)){
			alert("numeros vacios");
			return;
		}
		
		const resultado = restar(numero1, numero2);
		resultadoCalculadora.textContent = "El resultado es " + resultado; 
		
	});
	//boton multiplicar
	btnMultiplicar.addEventListener("click", function(){
		const {numero1, numero2} = obtenerNumero();
		
		if(!validar(numero1, numero2)){
			alert("numeros vacios");
			return;
		}
		
		const resultado = multiplicar(numero1, numero2);
		resultadoCalculadora.textContent = "El resultado es " + resultado; 
		
	});
	//boton dividir
	btnDividir.addEventListener("click", function(){
		const {numero1, numero2} = obtenerNumero();
		
		if(!validar(numero1, numero2)){
			alert("numeros vacios")
			return;
		}
		
		const resultado = dividir(numero1, numero2);
		if(resultado === null){
			resultadoCalculadora.textContent = "Erros: division para cero";
		} else {
			resultadoCalculadora.textContent = "El resultado es " + resultado; 
		}
		
	});
	
	
	//====================================
	//============ FORMULARIO ============
	//====================================
	
	const formRegistro = document.getElementById("form-registro");
	formRegistro.addEventListener("submit", FncDatosUser);
	
	
	function FncDatosUser(event){
		event.preventDefault();
		//Declaramos elementos
		const inputNombre = document.getElementById("nombre").value.trim();
		const inputCorreo = document.getElementById("correo").value.trim();
		const inputContrasena = document.getElementById("contrasena").value.trim();
		const inputFechaNacimiento = document.getElementById("fecha-nacimiento").value.trim();
		
		//validacion
		if (!inputNombre || !inputCorreo || !inputContrasena || !inputFechaNacimiento) {
				alert("No ha ingresado todos los datos");
				return;
			}
			
		//validaciones
		if(inputNombre.length < 4){
			alert("Error: campo nombre con menos de 3 letras");
				return;
		}
		
		if(inputContrasena.length < 7){
			alert("Error: campo nombre con menos de 6 letras");
				return;
		}
		
	
		//estructura tipo json
		const DatoUser = {
				inputNombre,
				inputCorreo,
				inputContrasena,
				inputFechaNacimiento
			};
			
		const DivSalida = document.createElement("div");
		
		DivSalida.textContent = "Enviando datos al servidor . . . . . .";
		DivSalida.style.marginTop = "20px";
		
		formRegistro.appendChild(DivSalida);
		setTimeout(() => {
			fetch("assets/json/data.json")
			
			.then((response) =>{
				if(!response.ok) throw new Error("Error al cargar el archivo Json");
				return response.json();
			})
			
			.then((data)=> {
				DivSalida.innerHTML = `
						<h3>Datos enviados correctamente... . . . .</h3>
						<p>El servidor respondió: ${data.mensaje}</p>
						<hr>
						<p>Nombres:${inputNombre}</p>
						<p>Email:${inputCorreo}</p>
						<p>Contrasena:${inputContrasena}</p>
						<p>Fecha:${inputFechaNacimiento}</p>
						<hr>
					`;
			})
			
			.catch((error)=> {
				DivSalida.innerHTML = `<p>Error: ${error.message}</p>`;
			});
		},2000);
	}
	 



	//====================================
	//============ FECHAS ============
	//====================================
	
	const fecha1Input = document.getElementById("fecha1");
	const fecha2Input = document.getElementById("fecha2");
	const btnCalcularFechas = document.getElementById("btn-calcular-fechas");
	const resultadoFechas  = document.getElementById("resultado-fechas");
	
	
	//funcion diferencia
	function calcularDiferenciaDias(fecha1, fecha2){
		const diferencia = fecha2.getTime() - fecha1.getTime();
		//conversion de milisegudos a dias
		return Math.floor(diferencia/(1000 * 60 * 60 * 24));
	}
	
	//boton
	btnCalcularFechas.addEventListener("click", function(){
		const fecha1Valor = fecha1Input.value;
		const fecha2Valor = fecha2Input.value;
		
		//validacion
		if (!fecha1Input || !fecha2Input ) {
			alert("No ha ingresado todos los datos");
			return;
		}
	
		const fecha1 = new Date(fecha1Valor);
		const fecha2 = new Date(fecha2Valor);	
	
		//valor absooluto para el orden
		const diferencia = Math.abs(calcularDiferenciaDias(fecha1,fecha2));
		
		resultadoFechas.textContent = "Diferencia: " + diferencia + " dias";
	});
	
});