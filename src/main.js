let tareas = {}; // Record<string, {id: string, complete: boolean}>

function start() {
    loadTareas();
    setTimeout(() => {
        mostrarTareas();
    }, 10)

    /* This code adds a new Task when you press "Enter"*/
    document.addEventListener("keyup", event => { 
        if (event.key !== "Enter") return; // Use `.key` instead.
        nuevaTarea();
    });
}
start();

function nuevaTarea() {
    const tareaInput = document.querySelector("#nuevaTareaInput");
    const tareaText = tareaInput.value;
    if (!tareaText) {
        console.warn("No hay tarea"); return;
    }
    tareas[tareaText] = {
        id: tareaText,
        complete: false,
    };
    tareaInput.value = ""; // Limpiar
    console.log(tareas);
    saveTareas();
    mostrarTareas();
}

function eliminarTarea(tareaId) {
    delete tareas[tareaId];
    saveTareas();
    mostrarTareas();
}

function completarTarea(tareaId) {
    tareas[tareaId].complete = true;
    saveTareas();
    mostrarTareas();
}

function incompletarTarea(tareaId) {
    tareas[tareaId].complete = false;
    saveTareas();
    mostrarTareas();
}

function mostrarTareas() {
    const listaDeTareas = Object.keys(tareas)
        .filter(tareaId => !tareas[tareaId].complete)
        .map((tareaId) => `
        <div class="tarea">
            <button class="completeBtn" onclick="completarTarea('${tareaId}')">
                Complete
            </button>
            <span class="tareaLabel">${tareas[tareaId].id}</span>
            
            <button class="deleteBtn" onclick="eliminarTarea('${tareaId}')">
                Delete
            </button>
        </div>`
        ).join("");

    document.querySelector("#listaDeTareas").innerHTML = listaDeTareas;

    const listaDeTareasCompletadas = Object.keys(tareas)
        .filter(tareaId => !!tareas[tareaId].complete)
        .map((tareaId) => `
        <div class="tarea">    
            <button class="incompleteBtn" onclick="incompletarTarea('${tareaId}')">
                Mark as incomplete
            </button>
            <span class="tareaLabel">${tareas[tareaId].id}</span>
           
            <button class="deleteBtn" onclick="eliminarTarea('${tareaId}')">
                Delete
            </button>
        </div>`
        ).join("");

    document.querySelector("#listaDeTareasCompletadas").innerHTML = listaDeTareasCompletadas;
}

function saveTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function loadTareas() {
    const savedTareas = localStorage.getItem("tareas");
    if (savedTareas) {
        tareas = JSON.parse(savedTareas);
    }
}
