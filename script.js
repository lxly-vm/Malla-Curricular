const courses = {
  "Primer semestre": [
    { name: "Introducción al cálculo", unlocks: ["Cálculo I"] },
    { name: "Introducción al álgebra", unlocks: ["Álgebra I"] },
    { name: "Introducción a la física", unlocks: ["Química inorgánica y orgánica", "Interpretación gráfica para la ingeniería", "Mecánica clásica"] },
    { name: "Taller de comunicación y redacción de informes", unlocks: ["Taller de Ingeniería"] },
    { name: "Introducción a la ingeniería", unlocks: ["Taller de Ingeniería"] },
  ],
  "Segundo semestre": [
    { name: "Cálculo I", unlocks: ["Cálculo II", "Mecánica clásica"] },
    { name: "Álgebra I", unlocks: ["Álgebra II", "Programación y algoritmo"] },
    { name: "Química inorgánica y orgánica", unlocks: ["Ingeniería de materiales", "Termodinámica"] },
    { name: "Interpretación gráfica para la ingeniería", unlocks: ["Termodinámica"] },
    { name: "Taller de Ingeniería", unlocks: ["Contabilidad y costos"] },
  ],
  "Tercer semestre": [
    { name: "Cálculo II", unlocks: ["Cálculo III", "Ecuaciones diferenciales", "Termodinámica", "Estadística y probabilidad"] },
    { name: "Álgebra II", unlocks: ["Ecuaciones diferenciales", "Estadística y probabilidad"] },
    { name: "Mecánica clásica", unlocks: ["Ingeniería de materiales", "Electromagnetismo"] },
    { name: "Programación y algoritmo", unlocks: ["Investigación operativa"] },
    { name: "Gestión de empresas", unlocks: ["Contabilidad y costos"] },
  ],
  "Cuarto semestre": [
    { name: "Cálculo III", unlocks: [] },
    { name: "Ecuaciones diferenciales", unlocks: [] },
    { name: "Ingeniería de materiales", unlocks: ["Operaciones unitarias"] },
    { name: "Termodinámica", unlocks: ["Operaciones unitarias", "Mecánica de fluidos"] },
    { name: "Contabilidad y costos", unlocks: ["Microeconomía"] },
  ],
  "Quinto semestre": [
    { name: "Electromagnetismo", unlocks: ["Procesos industriales y manufactura"] },
    { name: "Estadística y probabilidad", unlocks: ["Investigación operativa"] },
    { name: "Operaciones unitarias", unlocks: ["Procesos industriales y manufactura"] },
    { name: "Mecánica de fluidos", unlocks: ["Procesos industriales y manufactura"] },
    { name: "Microeconomía", unlocks: ["Ingeniería económica", "Macroeconomía", "Marketing", "Comportamiento organizacional y capital humano"] },
  ],
  "Sexto semestre": [
    { name: "Formación cultural", unlocks: ["Primera práctica profesional"] },
    { name: "Investigación operativa", unlocks: ["Gestión de operaciones", "Modelos estocásticos"] },
    { name: "Ingeniería económica", unlocks: ["Finanzas"] },
    { name: "Procesos industriales y manufactura", unlocks: ["Gestión de operaciones"] },
    { name: "Macroeconomía", unlocks: ["Econometría"] },
    { name: "Taller de integración de conocimientos", unlocks: ["Inglés comunicacional pre intermedio I"] },
  ],
  "Séptimo semestre": [
    { name: "Gestión de operaciones", unlocks: ["Preparación y evaluación de proyectos de ingeniería industrial", "Sistema de gestión y aseguramiento de la calidad"] },
    { name: "Finanzas", unlocks: ["Preparación y evaluación de proyectos de ingeniería industrial"] },
    { name: "Marketing", unlocks: ["Preparación y evaluación de proyectos de ingeniería industrial"] },
    { name: "Comportamiento organizacional y capital humano", unlocks: ["Sistema de información administrativa"] },
    { name: "Estadística para la ingeniería", unlocks: ["Sistema de gestión y aseguramiento de la calidad", "Modelos estocásticos", "Econometría"] },
  ],
  "Octavo semestre": [
    { name: "Sistema de información administrativa", unlocks: ["Dirección estratégica", "Gestión de proyectos"] },
    { name: "Preparación y evaluación de proyectos de ingeniería industrial", unlocks: ["Dirección estratégica", "Gestión de proyectos"] },
    { name: "Sistema de gestión y aseguramiento de la calidad", unlocks: ["Gestión de operaciones II", "Logística"] },
    { name: "Modelos estocásticos", unlocks: [] },
    { name: "Econometría", unlocks: [] },
    { name: "Primera práctica profesional", unlocks: ["EFP I", "EFP II", "EFP III", "EFP IV", "Segunda práctica profesional"] },
  ],
  "Noveno semestre": [
    { name: "Inglés comunicacional pre intermedio I", unlocks: ["Inglés comunicacional pre intermedio II"] },
    { name: "Dirección estratégica", unlocks: ["Segunda práctica profesional"] },
    { name: "Gestión de proyectos", unlocks: ["Segunda práctica profesional"] },
    { name: "Gestión de operaciones II", unlocks: ["Segunda práctica profesional"] },
    { name: "Logística", unlocks: ["Segunda práctica profesional"] },
  ],
  "Décimo semestre": [
    { name: "Inglés comunicacional pre intermedio II", unlocks: [] },
    { name: "EFP I", unlocks: ["EFP II"] },
    { name: "EFP II", unlocks: ["EFP III"] },
    { name: "EFP III", unlocks: ["EFP IV"] },
    { name: "EFP IV", unlocks: [] },
    { name: "Segunda práctica profesional", unlocks: [] },
  ],
  "Onceavo semestre": [
    { name: "Electivo seminario", unlocks: ["Actividad de titulación"] },
  ],
  "Doceavo semestre": [
    { name: "Actividad de titulación", unlocks: [] },
  ],
};

const mallaContainer = document.getElementById("malla-container");

let approved = new Set();

function render() {
  mallaContainer.innerHTML = "";

  for (const [semestre, subjects] of Object.entries(courses)) {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";

    const title = document.createElement("h2");
    title.textContent = semestre;
    semDiv.appendChild(title);

    subjects.forEach((course) => {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";
      courseDiv.textContent = course.name;
      courseDiv.dataset.name = course.name;

      // Decide si está bloqueado (prerrequisitos no aprobados)
      if (!canAccess(course.name)) {
        courseDiv.classList.add("blocked");
      }

      // Si ya está aprobado
      if (approved.has(course.name)) {
        courseDiv.classList.add("completed");
      }

      courseDiv.onclick = () => {
        if (courseDiv.classList.contains("blocked")) return;

        if (approved.has(course.name)) {
          approved.delete(course.name);
        } else {
          approved.add(course.name);
        }
        render();
      };

      semDiv.appendChild(courseDiv);
    });

    mallaContainer.appendChild(semDiv);
  }
}

function canAccess(courseName) {
  // Para cursos del primer semestre, siempre accesibles
  if (Object.keys(courses)
    .find(sem => courses[sem].some(c => c.name === courseName)) === "Primer semestre") {
    return true;
  }

  // Un curso es accesible si al menos uno de sus prerrequisitos está aprobado
  // Pero como sólo tenemos info de qué cursos desbloquea cada curso,
  // invertimos la búsqueda: un curso es accesible si TODOS sus prerrequisitos están aprobados

  // Para eso, necesitamos saber quiénes desbloquean este curso:

  let prereqs = [];

  for (const subjects of Object.values(courses)) {
    subjects.forEach(course => {
      if (course.unlocks.includes(courseName)) {
        prereqs.push(course.name);
      }
    });
  }

  // Si no tiene prerrequisitos, accesible
  if (prereqs.length === 0) return true;

  // Todos los prerrequisitos deben estar aprobados para que el curso se desbloquee
  return prereqs.every(pr => approved.has(pr));
}

render();

renderGrid();

