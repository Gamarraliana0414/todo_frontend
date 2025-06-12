const API_URL = "https://backend-1-nsfp.onrender.com/tareas";

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
        <span class="${tarea.completado ? 'text-decoration-line-through' : ''} ms-2">${tarea.titulo}</span>
      </div>
      <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
    `;

    lista.appendChild(li);
  });
}

async function crearTarea() {
  const input = document.getElementById("nueva-tarea");
  const titulo = input.value.trim();
  if (!titulo) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo: titulo })
  });

  input.value = "";
  obtenerTareas();
}

async function toggleCompletado(id, completado) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completado: completado })
  });
  obtenerTareas();
}

async function eliminarTarea(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  obtenerTareas();
}

obtenerTareas();
