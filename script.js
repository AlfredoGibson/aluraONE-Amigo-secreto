const amigos = [];
const input = document.getElementById('amigo');
const lista = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');

document.getElementById('add').addEventListener('click', () => {
    let nombre = input.value.trim();
    if (!nombre || /\d/.test(nombre) || amigos.includes(nombre.toLowerCase())) {
        alert("⚠️ Nombre inválido o repetido.");
        return;
    }
    amigos.push(nombre);
    actualizarLista();
    input.value = '';
});

function actualizarLista() {
    lista.innerHTML = amigos.map(a =>
        `<div class="friend"><span>${a}</span>
        <button class="remove-btn" data-name="${a}">❌</button></div>`
    ).join('');
}

lista.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        amigos.splice(amigos.indexOf(e.target.dataset.name), 1);
        actualizarLista();
    }
});

document.getElementById('sortear').addEventListener('click', () => {
    if (amigos.length < 2) return alert('⚠️ Mínimo 2 participantes');
    const shuffled = amigos.sort(() => Math.random() - 0.5);
    resultado.innerHTML = shuffled.map((g, i) =>
        `<div class="result-pair"><span>${g}</span> → <span>${shuffled[(i + 1) % shuffled.length]} 🎁</span></div>`
    ).join('');
    lanzarConfeti();
});

function lanzarConfeti() {
    [...Array(100)].forEach(() => {
        let confeti = document.createElement("div");
        confeti.classList.add("confetti");
        Object.assign(confeti.style, {
            width: `${Math.random() * 12 + 8}px`,
            height: `${Math.random() * 12 + 8}px`,
            left: `${Math.random() * 100}vw`,
            backgroundColor: ["#ff4757", "#2ed573", "#1e90ff", "#ff7f50", "#ffcc00", "#a29bfe", "#00cec9", "#fd79a8"][Math.floor(Math.random() * 8)],
            opacity: Math.random() * 0.8 + 0.2,
            animationDuration: `${Math.random() * 3 + 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
        });
        document.body.appendChild(confeti);
        setTimeout(() => confeti.remove(), 5000);
    });
}

