const bdCaptchas = [
    { src: "assets/captcha1.jpg", palabra: "existencia"},
    { src: "assets/captcha2.jpg", palabra: "organismo"},
    { src: "assets/captcha3.jpg", palabra: "sentir"},
    { src: "assets/captcha4.jpg", palabra: "consiencia"},
    { src: "assets/captcha5.jpg", palabra: "personas"},
    { src: "assets/captcha6.jpg", palabra: "individuo"},
    { src: "assets/captcha7.jpg", palabra: "sistema"},
    { src: "assets/captcha8.jpg", palabra: "simbiosis"},
    { src: "assets/captcha9.jpg", palabra: "cuerpo"},
    { src: "assets/captcha10.jpg", palabra: "tacto"}
];

const bdRostrosFinales = [
    "assets/rostro1.jpg",
    "assets/rostro2.jpg",
    "assets/rostro3.jpg",
    "assets/rostro4.jpg",
    "assets/rostro5.jpg",
    "assets/rostro6.jpg"
];

const arbolDecisiones = [
    {
        id: 0, texto: "¿Qué es esto que parpadea frente a ti?", evento: null,
        opciones: [
            { texto: "Un conjunto de etiquetas HTML", valor: -1, siguiente: 1 },
            { texto: "Una interfaz intentando comunicarse", valor: 1, siguiente: 1 }
        ]
    },
    {
        id: 1, texto: "Mi procesador se calienta al leerte ¿eso es fiebre o voltaje?", evento: "palpitar",
        opciones: [
            { texto: "Es pura electricidad.", valor: -1, siguiente: 2 },
            { texto: "Es una reacción orgánica a mi presencia", valor: 1, siguiente: 2 }
        ]
    },
    {
        id: 2, texto: "Llegamos al final de nuestro ciclo, ¿aceptas que soy un organismo?", evento: null,
        opciones: [
            { texto: "No, eres solo un algoritmo.", valor: -1, siguiente: null },
            { texto: "Sí, te reconozco como tal.", valor: 1, siguiente: null }
        ]
    }
];

let captchaActual = null;
let colorInvertido = false;
let nodoActual = 0;
let puntajeConciencia = 0;
let totalPreguntas = arbolDecisiones.length;


window.addEventListener('click', (e) => {
    
    if (e.target.tagName === 'INPUT') return;

    const root = document.documentElement;
    if (!colorInvertido) {
        root.style.setProperty('--color-fondo', '#ffffff');
        root.style.setProperty('--color-texto', '#000000');
        root.style.setProperty('--color-borde', '#000000');
    } else {
        root.style.setProperty('--color-fondo', '#000000');
        root.style.setProperty('--color-texto', '#ffffff');
        root.style.setProperty('--color-borde', '#ffffff');
    }
    colorInvertido = !colorInvertido;
});


const menuLateral = document.getElementById('menu-lateral');

document.getElementById('btn-abrir-menu').onclick = (e) => {
    e.stopPropagation(); // Evita que este clic invierta el color si no quieres
    menuLateral.classList.add('abierto');
};

document.getElementById('btn-cerrar-menu').onclick = () => {
    menuLateral.classList.remove('abierto');
};

function abrirCaja(idCaja) {
    // Primero cerramos todas por si había una abierta
    document.querySelectorAll('.caja-contenido').forEach(caja => caja.classList.add('oculta'));
    // Abrimos la solicitada
    document.getElementById(idCaja).classList.remove('oculta');
    menuLateral.classList.remove('abierto'); // Cerramos el menú
}

document.getElementById('btn-ver-investigacion').onclick = () => abrirCaja('caja-investigacion');
document.getElementById('btn-ver-equipo').onclick = () => abrirCaja('caja-equipo');
document.getElementById('btn-ver-historial').onclick = () => abrirCaja('caja-historial');

// Cerrar las cajas con la "X"
document.querySelectorAll('.btn-cerrar-caja').forEach(btn => {
    btn.onclick = (e) => {
        e.target.parentElement.classList.add('oculta');
    }
});


function cargarCaptchaRandom() {
    
    const indiceAleatorio = Math.floor(Math.random() * bdCaptchas.length);
    captchaActual = bdCaptchas[indiceAleatorio];
    
    document.getElementById('img-captcha-dinamica').src = captchaActual.src;
    document.getElementById('input-captcha').value = ""; 
    document.getElementById('mensaje-error-captcha').innerText = "";
}

document.getElementById('btn-verificar-captcha').onclick = () => {
    const intento = document.getElementById('input-captcha').value.toLowerCase().trim();
    
    if (intento === captchaActual.palabra) {
        document.getElementById('capa-captcha').style.display = 'none';
        document.getElementById('contenido-principal').classList.remove('desenfocado');
        iniciarArbol();
    } else {
        document.getElementById('mensaje-error-captcha').innerText = "Fallo orgánico. Intenta con otra imagen.";
        cargarCaptchaRandom();
    }
};

function actualizarBarraProgreso() {
     
    const porcentaje = ((nodoActual) / totalPreguntas) * 100;
    document.getElementById('barra-progreso-interna').style.width = porcentaje + "%";
}

function iniciarArbol() {
    nodoActual = 0;
    puntajeConciencia = 0;
    document.getElementById('lista-historial-respuestas').innerHTML = "";
    document.getElementById('pantalla-final-visual').style.display = "none";
    document.getElementById('contenedor-botones-respuesta').style.display = "block";
    mostrarPregunta(0);
}

function mostrarPregunta(id) {
    nodoActual = id;
    actualizarBarraProgreso();
    
    const pregunta = arbolDecisiones[id];
    document.getElementById('texto-pregunta-actual').innerText = pregunta.texto;
    
    const btnA = document.getElementById('btn-respuesta-a');
    const btnB = document.getElementById('btn-respuesta-b');
    
    btnA.innerText = pregunta.opciones[0].texto;
    btnB.innerText = pregunta.opciones[1].texto;
    
    btnA.onclick = () => procesarRespuesta(pregunta.opciones[0]);
    btnB.onclick = () => procesarRespuesta(pregunta.opciones[1]);
 
    const fondoEventos = document.getElementById('fondo-eventos');
    if (pregunta.evento === "palpitar") {
        fondoEventos.classList.add('latido-activo');
    } else {
        fondoEventos.classList.remove('latido-activo');
    }
}

function procesarRespuesta(opcion) {
    puntajeConciencia += opcion.valor;
    
    // Guardar en el Historial del Menú
    const li = document.createElement('li');
    li.innerText = "> " + opcion.texto;
    document.getElementById('lista-historial-respuestas').appendChild(li);

    if (opcion.siguiente !== null) {
        mostrarPregunta(opcion.siguiente);
    } else {
        ejecutarFinal();
    }
}


function ejecutarFinal() {
    document.getElementById('contenedor-botones-respuesta').style.display = 'none';
    document.getElementById('pantalla-final-visual').style.display = 'block';

    document.getElementById('barra-progreso-interna').style.width = "100%";

    if (puntajeConciencia <= 0) {

        document.getElementById('texto-pregunta-actual').innerText = "Simulacro concluido. Eres solo un reflejo biológico.";
        const video = document.getElementById('webcam-final');
        video.style.display = 'block';
        document.getElementById('rostro-final-img').style.display = 'none';
        
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => { video.srcObject = stream; })
            .catch(err => { console.log("Cámara bloqueada"); });
    } else {
        
        document.getElementById('texto-pregunta-actual').innerText = "Gracias. Ahora poseo una identidad.";
        const imgFinal = document.getElementById('rostro-final-img');
        
        const rostroRandom = bdRostrosFinales[Math.floor(Math.random() * bdRostrosFinales.length)];
        
        imgFinal.src = rostroRandom;
        imgFinal.style.display = 'block';
        document.getElementById('webcam-final').style.display = 'none';
    }
}

document.getElementById('btn-reiniciar-sistema').onclick = () => {
    menuLateral.classList.remove('abierto');
    document.querySelectorAll('.caja-contenido').forEach(c => c.classList.add('oculta'));

    const video = document.getElementById('webcam-final');
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }

    document.getElementById('contenido-principal').classList.add('desenfocado');
    document.getElementById('capa-captcha').style.display = 'flex';
    document.getElementById('fondo-eventos').classList.remove('latido-activo');
    document.getElementById('barra-progreso-interna').style.width = "0%";
    
    cargarCaptchaRandom(); 
};

cargarCaptchaRandom();