import {
    db,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot
} from "./firebase.js";

// ===============================
// ELEMENTOS DEL HTML
// ===============================

const modal = document.getElementById("modal");
const addButton = document.getElementById("addButton");
const close = document.getElementById("close");
const save = document.getElementById("save");

const places = document.getElementById("places");

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const mapsInput = document.getElementById("maps");

const emojiButtons = document.querySelectorAll(".emoji");

// ===============================
// VARIABLES
// ===============================

let selectedEmoji = "📍";

let lugares = [];

let editingId = null;

const lugaresRef = collection(db, "lugares");

onSnapshot(lugaresRef, (snapshot) => {

    lugares = [];

    snapshot.forEach((docSnap) => {

        lugares.push({

            id: docSnap.id,

            ...docSnap.data()

        });

    });

    render();

});

// ===============================
// ABRIR / CERRAR MODAL
// ===============================

addButton.onclick = () => {

    modal.style.display = "flex";

};

close.onclick = () => {

    cerrarModal();

};

window.onclick = (e) => {

    if(e.target === modal){

        cerrarModal();

    }

};

// ===============================
// CERRAR MODAL
// ===============================

function cerrarModal(){

    modal.style.display = "none";

    nameInput.value = "";

    descriptionInput.value = "";

    mapsInput.value = "";

    selectedEmoji = "📍";

    editingId = null;

    emojiButtons.forEach(btn=>{

        btn.classList.remove("emojiSelected");

        if(btn.dataset.emoji==="📍"){

            btn.classList.add("emojiSelected");

        }

    });

}

// ===============================
// SELECCIONAR EMOJI
// ===============================

emojiButtons.forEach(btn=>{

    if(btn.dataset.emoji==="📍"){

        btn.classList.add("emojiSelected");

    }

    btn.onclick = ()=>{

        emojiButtons.forEach(b=>{

            b.classList.remove("emojiSelected");

        });

        btn.classList.add("emojiSelected");

        selectedEmoji = btn.dataset.emoji;

    };

});

// ===============================
// BOTÓN GUARDAR
// ===============================

save.onclick = async ()=>{

    if(nameInput.value.trim()===""){

        alert("Escribe un nombre.");

        return;

    }

    const lugar={

        emoji:selectedEmoji,
        nombre:nameInput.value,
        descripcion:descriptionInput.value,
        maps:mapsInput.value

    };

    if(editingId){

        await updateDoc(

            doc(db,"lugares",editingId),

            lugar

        );

    }else{

        await addDoc(

            collection(db,"lugares"),

            lugar

        );

    }

    cerrarModal();

};

// ===============================
// CREAR TARJETAS
// ===============================

function render(){

    places.innerHTML="";

    if(lugares.length===0){

        places.innerHTML=`

        <div class="empty">

            <h2>No hay lugares agregados</h2>

            <p>Presiona el botón + para comenzar.</p>

        </div>

        `;

        return;

    }

    lugares.forEach((lugar,index)=>{

        const card=document.createElement("div");

        card.className="card";

        card.innerHTML=`

        <div class="emoji">

            ${lugar.emoji}

        </div>

        <h2>${lugar.nombre}</h2>

        <p>${lugar.descripcion}</p>

        <div class="buttons">

            <button class="maps">

                📍 Maps

            </button>

            <button class="edit">

                ✏ Editar

            </button>

            <button class="delete">

                🗑

            </button>

        </div>

        `;

        // ---- MAPS ----

        card.querySelector(".maps").onclick=()=>{

            if(lugar.maps.trim()!=""){

                window.open(lugar.maps,"_blank");

            }else{

                alert("Este lugar no tiene un enlace de Google Maps.");

            }

        };

        // La Parte 2 continúa aquí...

                // ---- EDITAR ----

        card.querySelector(".edit").onclick = () => {

            modal.style.display = "flex";

            nameInput.value = lugar.nombre;

            descriptionInput.value = lugar.descripcion;

            mapsInput.value = lugar.maps;

            editingId = lugar.id;

            selectedEmoji = lugar.emoji;

            emojiButtons.forEach(btn => {

                btn.classList.remove("emojiSelected");

                if(btn.dataset.emoji === lugar.emoji){

                    btn.classList.add("emojiSelected");

                }

            });

        };

        // ---- ELIMINAR ----

card.querySelector(".delete").onclick = async () => {

    if(confirm("¿Eliminar este lugar?")){

        await deleteDoc(
            doc(db, "lugares", lugar.id)
        );

    }

};

places.appendChild(card);

});

}

// ===============================
// TECLA ESC PARA CERRAR EL MODAL
// ===============================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        cerrarModal();

    }

});
