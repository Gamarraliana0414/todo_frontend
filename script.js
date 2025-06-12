const API_URL = "https://backend-2-xeze.onrender.com/tareas";

// Cargar tareas al iniciar
async function obtenerTareas() {
  const res = await fetch(API_URL);
  const tareas = await res.json();
  const lista = document.getElementById("lista-tareas");
  lista.innerHTML = "";

  tareas.forEach(tarea => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <input type="checkbox" ${tarea.completado ? "checked" : ""} onchange="toggleCompletado(${tarea.id}, this.checked)">
        <strong class="${tarea.completado ? 'text-decoration-line-through' : ''} ms-2">${tarea.titulo}</strong>
        <p class="mb-0 ms-4">${tarea.descripcion || ""}</p>
      </div>
      <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
    `;

    lista.appendChild(li);
  });
}

// Crear una nueva tarea al enviar el formulario
async function crearTarea(e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();

  if (!titulo) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descripcion })
  });

  document.getElementById("tareaForm").reset();
  obtenerTareas();
}

// Cambiar estado de completado
async function toggleCompletado(id, completado) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completado })
  });
  obtenerTareas();
}

// Eliminar tarea
async function eliminarTarea(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  obtenerTareas();
}

// Asociar el formulario con el evento submit
document.getElementById("tareaForm").addEventListener("submit", crearTarea);

// Cargar tareas al cargar la página
obtenerTareas();

