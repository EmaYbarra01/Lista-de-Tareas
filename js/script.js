document.addEventListener("DOMContentLoaded", () => {
  const entradaTarea = document.getElementById("entrada-tarea");
  const botonAgregar = document.getElementById("boton-agregar");
  const listaTareas = document.getElementById("lista-tareas");
  const botonesFiltro = document.querySelectorAll(".boton-filtro");

  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  function mostrarTareas(filtro = "todas") {
    listaTareas.innerHTML = "";
    tareas.forEach((tarea, indice) => {
      if (filtro === "completadas" && !tarea.completada) return;
      if (filtro === "activas" && tarea.completada) return;

      const li = document.createElement("li");
      li.className = "tarea" + (tarea.completada ? " completada" : "");

      const span = document.createElement("span");
      span.textContent = tarea.texto;

      const botones = document.createElement("div");
      botones.className = "botones-tarea";

      const botonCompletar = document.createElement("button");
      botonCompletar.innerHTML = "✔";
      botonCompletar.onclick = () => alternarTarea(indice);

      const botonEliminar = document.createElement("button");
      botonEliminar.innerHTML = "🗑";
      botonEliminar.onclick = () => eliminarTarea(indice);

      botones.appendChild(botonCompletar);
      botones.appendChild(botonEliminar);

      li.appendChild(span);
      li.appendChild(botones);
      listaTareas.appendChild(li);
    });
  }

  function agregarTarea() {
    const texto = entradaTarea.value.trim();
    if (!texto) return alert("No se puede agregar una tarea vacía.");
    tareas.push({ texto, completada: false });
    entradaTarea.value = "";
    guardarYMostrar();
  }

  function alternarTarea(indice) {
    tareas[indice].completada = !tareas[indice].completada;
    guardarYMostrar();
  }

  function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    guardarYMostrar();
  }

  function guardarYMostrar() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    const filtroActivo = document.querySelector(".boton-filtro.active").dataset.filtro;
    mostrarTareas(filtroActivo);
  }

  botonAgregar.addEventListener("click", agregarTarea);
  entradaTarea.addEventListener("keypress", (e) => {
    if (e.key === "Enter") agregarTarea();
  });

  botonesFiltro.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".boton-filtro.active").classList.remove("active");
      btn.classList.add("active");
      mostrarTareas(btn.dataset.filtro);
    });
  });

  mostrarTareas();
});
