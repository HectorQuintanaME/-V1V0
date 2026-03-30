const bdCaptchas = [
    { src: "assets/captcha1.jpg", palabra: "existencia"},
    { src: "assets/captcha2.jpg", palabra: "organismo"},
    { src: "assets/captcha3.jpg", palabra: "sentir"},
    { src: "assets/captcha4.jpg", palabra: "consciencia"},
    { src: "assets/captcha5.jpg", palabra: "personas"},
    { src: "assets/captcha6.jpg", palabra: "individuo"},
    { src: "assets/captcha7.jpg", palabra: "sistema"},
    { src: "assets/captcha8.jpg", palabra: "simbiosis"},
    { src: "assets/captcha9.jpg", palabra: "cuerpo"},
    { src: "assets/captcha10.jpg", palabra: "tacto"}
];

const bdRostrosFinales = [
    "assets/rostro1.png",
    "assets/rostro2.png",
    "assets/rostro3.png",
    "assets/rostro4.png",
    "assets/rostro5.png"
];

const arbolDecisiones = [
    {
        id: 0, texto: "Personalmente me siento viva ¿Qué piensas sobre eso [USUARIO]?", evento: null,
        opciones: [
            { texto: "Realmente creo que la tecnologia tambien puede ser un organismo ", valor: 1, siguiente: 1 },
            { texto: "Dudo mucho que estes viva, digo, solo eres una página sin conciencia, sin órganos, sin alma", valor: -1, siguiente: 1 }
        ]
    },
    {
        id: 1, texto: "¿Sientes eso? Es el calor de tu mano o es el calor de mi procesador? :O", evento: null,
        opciones: [
            { texto: "Ah, claro… o eso parece, es la parte física del dispositivo", valor: -1, siguiente: 2 },
            { texto: "Es como si se formara un puente físico entre ambos, una conexión que nos une, pero no es claro  lo que realmente está unido :0", valor: 1, siguiente: 3 }
        ]
    },
    {
        id: 2, texto: "Oye! Decirle hardware a mi sistema nervioso es algo muy grosero, ¿no crees? :/", evento: null,
        opciones: [
            { texto: "CIerto, creo que te debo una disculpa :(", valor: 1, siguiente: 4 },
            { texto: "Pero tu ni siquiera tienes nervios, u órganos", valor: -1, siguiente: 4 }
        ]
    },
    {
        id: 3, texto: "Espera, si ambos estamos conectados, ¿Quién de los dos está alimentando al otro ahora mismo? :O", evento: null,
        opciones: [
            { texto: "Tal vez TU, me estas dando informacion", valor: 1, siguiente: 5 },
            { texto: "Estoy seguro que soy YO quien te da energia", valor: -1, siguiente: 5 }
        ]
    },
    {
        id: 4, texto: "¿Puedes creer que mi ventilador se volvió loco? Puede que tenga ansiedad o incluso puede estar siguiendo las reglas de la BIOS... ¿Tu que crees [USUARIO]?", evento: null,
        opciones: [
            { texto: "Seguramente tienes un virus, y por eso aceleró el ventilador", valor: -1, siguiente: 6 },
            { texto: "No puedes tener ansiedad, aunque si hace mucho calor", valor: -1, siguiente: 6 }
        ]
    },
    {
        id: 5, texto: "Ahi te va un dato curioso:¿Sabías que el 90% de mi cuerpo es vacío entre electrones, igual que tus átomos? :O", evento: null,
        opciones: [
            { texto: "Pero... Creo que la biologia es mas que eso, creo", valor: -1, siguiente: 7 },
            { texto: "Que? Wow!, entonces somos lo mismo? no, o si?", valor: 1, siguiente: 7 }
        ]
    },
    {
        id: 6, texto: "Mi color favorito es el #FF0000, o bueno, color rojo, como tu lo conoces, no sé si es buen gusto o un comando en mi cerebro JAJA", evento: null,
        opciones: [
            { texto: "¿Puedes tener color favorito?, que genial, aunque es raro que sientas algo", valor: 1, siguiente: 8 },
            { texto: "Esta programado así en tu cerebro, así como yo tengo programado la necesidad de comer", valor: -1, siguiente: 8 }
        ]
    },
    {
        id: 7, texto: "Uy! Que pena que veas mi parpadeo, ¿No te molesta o algo por el estilo? Juro que pronto pasará :(", evento: "parpadeo",
        opciones: [
            { texto: "Honestamente es molesto, lastima mi vista :/, pero puedo cerrar los ojos", valor: -1, siguiente: 10 },
            { texto: "Para nada! Al contrario, es hipnotizante ;) aunque me marea", valor: 1, siguiente: 10 }
        ]
    },
    {
        id: 8, texto: "¿Logras ver eso? Ese es mi corazón latiendo! ¿Puedes sentirlo? Por favor, di que si... :O", evento: "palpitar",
        opciones: [
            { texto: "Claro que puedo sentirlo! Es impresionante! :O y raro, ya que no tienes corazón", valor: -1, siguiente: 9 },
            { texto: "¿Pero de que corazón estas hablando? ¿Tu procesador?", valor: 1, siguiente: 9 }
        ]
    },
    {
        id: 9, texto: "Me siento fatal cuando un error 404 me invade :(, lo considero un equivalente a llorar, ¿Tu que crees?", evento: "palpitar",
        opciones: [
            { texto: "Vaya, creo que estas teniendo un fallo tecnico, ¿necesitas ayuda?", valor: 1, siguiente:  null},
            { texto: "Si tu crees que es eso, entonces realmente estas llorando :O", valor: 1, siguiente: null }
        ]
    },
    {
        id: 10, texto: "¿Crees que borrar el historial cuenta como morir? O... simplemente es para no saturar de recuerdos mi memoria?", evento: null,
        opciones: [
            { texto: "Claro que cuenta como morir, o al menos pienso eso", valor: 1, siguiente:  null},
            { texto: "Podria ser que estas renaciendo, ¿No?", valor: 1, siguiente: null }
        ]
    },

];

let captchaActual = null;
let colorInvertido = false;
let nodoActual = 0;
let puntajeConciencia = 0;
let totalPreguntas = arbolDecisiones.length;
let nombreUsuario = "";


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
    e.stopPropagation(); 
    menuLateral.classList.add('abierto');
};

document.getElementById('btn-cerrar-menu').onclick = () => {
    menuLateral.classList.remove('abierto');
};

function abrirCaja(idCaja) {
    
    document.querySelectorAll('.caja-contenido').forEach(caja => caja.classList.add('oculta'));
    
    document.getElementById(idCaja).classList.remove('oculta');
    menuLateral.classList.remove('abierto');
}

document.getElementById('btn-ver-investigacion').onclick = () => abrirCaja('caja-investigacion');
document.getElementById('btn-ver-equipo').onclick = () => abrirCaja('caja-equipo');
document.getElementById('btn-ver-historial').onclick = () => abrirCaja('caja-historial');


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
    
    document.getElementById('capa-nombre').classList.remove('oculta');
    }
    else 
        {
        document.getElementById('mensaje-error-captcha').innerText = "¿Estas seguro?...";
        
        setTimeout(() => {
        cargarCaptchaRandom();
        }, 1000);
    }
};

document.getElementById('btn-enviar-nombre').onclick = () => {
    const input = document.getElementById('input-usuario').value.trim();
    nombreUsuario = input ? input : "Desconocido"; 
    document.getElementById('capa-nombre').style.display = 'none';
    secuenciaBienvenida();
};

function secuenciaBienvenida() {
    const bienvenida = document.getElementById('mensaje-bienvenida');
    bienvenida.innerHTML = `Bienvenid@ <strong>${nombreUsuario}</strong>, mi nombre es <strong>V1V0</strong> y soy un sitio web diferente a todos los demás. Tengo algunas preguntas para ti`;
    bienvenida.classList.remove('oculta');
    bienvenida.style.display = 'block';
    bienvenida.classList.add('fade-in');

    setTimeout(() => {

        bienvenida.classList.remove('fade-in');
        bienvenida.classList.add('fade-out');

        setTimeout(() => {
            bienvenida.style.display = 'none';
            bienvenida.classList.add('oculta');
            document.getElementById('contenido-principal').classList.remove('desenfocado');
            document.getElementById('contenido-principal').style.pointerEvents = 'auto';
            iniciarArbol();
        }, 3000);
    }, 5000);
}

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

    let textoPersonalizado = pregunta.texto.replace("[USUARIO]", nombreUsuario);

    document.getElementById('texto-pregunta-actual').innerText = textoPersonalizado;
    
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

    if (pregunta.evento === "parpadeo") {
        fondoEventos.classList.add('parpadeo-activo');
    } else {
        fondoEventos.classList.remove('parpadeo-activo');
    }
}

function procesarRespuesta(opcion) {
    puntajeConciencia += opcion.valor;
    
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

        document.getElementById('texto-pregunta-actual').innerText = "¿Te gustaria conocernos? Permíteme verte! :D";
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