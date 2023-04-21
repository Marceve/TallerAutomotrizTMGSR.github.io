// acceder al formulario
const formulario = document.getElementById('formulario');
// almacenar todos los input del formulario, querySelectorAll, se va a obtener un arreglo lo de los input
// esto para que cada que hay un evento compruebe lo ingresado
const inputs = document.querySelectorAll('#formulario input');
const textareas = document.querySelectorAll('#formulario textarea');


// objeto de expresiones
const expresiones = {
	
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	comentario: /^[a-zA-ZÀ-ÿ\s]{1,500}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

// objeto con los valores de los campos
// esto para ver si los campos llegan a ser validos(true)
const campos = {
	nombre: false,
	comentario: false,
	correo: false,
	telefono: false
}


// va a comprobar
const validarFormulario = (e) => {

	switch (e.target.name) {
		// en caaso del que el nombre del input sea:

		case "nombre":
			// si es nombre se ejecuta:
			validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
		case "comentario":
			// si es comentario se ejecuta:
			validarCampo(expresiones.comentario, e.target, 'comentario');
			break;
		case "correo":
			// si es correo se ejecuta:
			validarCampo(expresiones.correo, e.target, 'correo');
			break;
		case "telefono":
			// si es telefono se ejecuta:
			validarCampo(expresiones.telefono, e.target, 'telefono');
			break;
	}
}



const validarCampo = (expresion, input, campo) => {
	// si es correcto
	if (expresion.test(input.value)) {
		// poner la  (correcta) y quitar la (incorrecta)
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		// poner la  cehck(correcta) y quitar la de time(incorrecta)
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		// quitar la clase de error activo
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		// se activa en true si el campo es correcto
		campos[campo] = true;

		// si es incorrecto
	} else {
		// poner la (incorrecta) y quitar la (correcta)
		// bactis (´´) temple literal
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		// poner la de time(incorrecta) y quitar la  cehck(correcta)
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		// colocar la clase de error activo
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		// se activa en false si el campo es incorrecto
		campos[campo] = false;
	}
}



// por cada input se realize una funcion
inputs.forEach((input) => {
	// keyup = cada que se ingrese algo y levante la tecla, se active la funcion
	// esto para que valide cada letra o simbolo que ingrese
	input.addEventListener('keyup', validarFormulario);
	// para que cuando este afuera del input
	input.addEventListener('blur', validarFormulario);
});

// por cada input se realize una funcion
textareas.forEach((textarea) => {
	// keyup = cada que se ingrese algo y levante la tecla, se active la funcion
	// esto para que valide cada letra o simbolo que ingrese
	textarea.addEventListener('keyup', validarFormulario);
	// para que cuando este afuera del input
	textarea.addEventListener('blur', validarFormulario);
});

// cuando le de un click enviar el formulario
formulario.addEventListener('submit', (e) => {

	// esto para que no se envien los datos
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	// si todos los campos son verdaderos
	if (campos.nombre && campos.comentario && campos.correo && campos.telefono && terminos.checked) {
		// se ejecuta el codigo


		// borrar los campos
		formulario.reset();

		// agregar clase 
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

		// 
		setTimeout(() => {
			// quitar clase
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);
		// 5000 esperar 5s para que se quite el texto(la clase)

		// por cada icono, se quiere acceder al tipo de clase
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			// quitar los icons
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		// agredar la clase si los espacios no son correctos o no a aceptado las condiciones
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});